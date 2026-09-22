from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional
import google.generativeai as genai
from langchain_community.document_loaders import PyPDFLoader
import requests
import tempfile
import os
from google.api_core import exceptions
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Medical Report Analysis API",
    description="API service for analyzing medical reports using Gemini AI",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("Gemini API key not found. Please set the GEMINI_API_KEY environment variable.")

# Configure Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# Models for request and response
class PDFAnalysisRequest(BaseModel):
    pdf_url: HttpUrl
    
class AnalysisResponse(BaseModel):
    status: str
    analysis: Optional[str] = None
    error: Optional[str] = None

def analyze_medical_report(content):
    """Uses Gemini AI to analyze medical report content"""
    prompt = """You are an AI medical assistant that answers queries based on the given context and relevant medical knowledge. 
    Here are some guidelines:
    - Prioritize information from the provided documents but supplement with general medical knowledge when necessary.
    - Ensure accuracy, citing sources from the document where applicable.
    - Provide confidence scoring based on probability and reasoning.
    - Be concise, informative, and avoid speculation.
    YOU WILL ANALYSE ONLY MEDICAL DATA, if other CONTEXT is PASSED you will say "Provide Relevant Medical Data. Thanks"
    Answer:
    - **Response:** 
    - **Reasoning:** (explain why this answer is correct and any potential limitations)
"""
    
    for attempt in range(MAX_RETRIES):
        try:
            response = model.generate_content(f"{prompt}\n\n{content}")
            return response.text
        except exceptions.GoogleAPIError as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
            else:
                return fallback_analysis(content)

def fallback_analysis(content):
    """Provides a fallback analysis when API has issues"""
    word_count = len(content.split())
    return f"""
    Fallback Analysis:
    1. Document Type: Text-based medical report
    2. Word Count: Approximately {word_count} words
    3. Content: The document appears to contain medical information, but detailed analysis is unavailable due to technical issues.
    4. Recommendation: Please review the document manually or consult with a healthcare professional for accurate interpretation.
    5. Note: This is a simplified analysis due to temporary unavailability of the AI service. For a comprehensive analysis, please try again later.
    """

def extract_text_from_pdf(pdf_url):
    """Downloads a PDF from a URL and extracts its text content"""
    # Download the PDF from the URL
    response = requests.get(pdf_url, timeout=30)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=f"Failed to download the PDF from URL: {pdf_url}")
    
    # Save the PDF to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        tmp_file.write(response.content)
        tmp_file_path = tmp_file.name
    
    try:
        # Use PyPDFLoader to load the PDF
        loader = PyPDFLoader(tmp_file_path)
        docs = loader.load()
        
        # Extract text from documents
        if docs and isinstance(docs, list):
            text = "\n".join([doc.page_content for doc in docs])
            return text
        return None
    finally:
        # Clean up the temporary file
        if os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)

@app.post("/analyze-pdf", response_model=AnalysisResponse)
async def analyze_pdf(request: PDFAnalysisRequest):
    """
    Analyze a medical PDF report from a given URL
    
    - **pdf_url**: Full URL to a PDF file containing medical data
    
    Returns the analysis result or an error message
    """
    try:
        # Extract text from the PDF
        pdf_text = extract_text_from_pdf(request.pdf_url)
        
        if not pdf_text:
            return AnalysisResponse(
                status="error",
                error="Failed to extract text from PDF or PDF was empty"
            )
            
        # Perform analysis
        analysis = analyze_medical_report(pdf_text)
        
        return AnalysisResponse(
            status="success",
            analysis=analysis
        )
    except Exception as e:
        return AnalysisResponse(
            status="error",
            error=f"Error processing request: {str(e)}"
        )

@app.get("/")
async def health_check():
    """Simple health check endpoint"""
    return {"status": "healthy", "service": "Medical Report Analysis API"}

