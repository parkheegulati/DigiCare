from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_core.documents import Document
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAI, GoogleGenerativeAIEmbeddings
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

def generate_insights(context):
    template = """
        You are a medical analysis AI. Given the patient data and medical history in the context below, generate a structured, long-form JSON insight report, for the doctor to have a better understanding of the patient's health status.

        Instructions:
        - Extract and summarize patient background
        - Identify key medical events and organize them in a timeline
        - Highlight current symptoms, risk factors, and any test results
        - Add a section with personalized recommendations
        - Return your answer ONLY as a JSON with the following:

        {{
        "patient_summary": "...",
        "timeline": [
            {{"date": "...", "event": "...", "finding": "..."}}
        ],
        "previous_medications": [...],
        "current_health_status": "...",
        "allergies": [...],
        "family_history": "...",
        "test_results": {{
            "blood_test": "...",
            "culture_test": "...",
            "imaging": "..."
        }},
        "recommendations": [...]
        }}

        Context:
        {context}
    """


    prompt = PromptTemplate(
        input_variables=["context"],
        template=template
    )

    llm = GoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key,
        temperature=0.3
    )

    chain = prompt | llm
    response = chain.invoke({"context": context})
    import re
    import json
    
    # Remove code block markers and language identifier if present
    response_text = response
    json_match = re.search(r'```(?:json)?\s*([\s\S]+?)```', response_text, re.DOTALL)
    
    if json_match:
        # Extract content between code block markers
        json_str = json_match.group(1).strip()
    else:
        # If no code blocks, use the whole response
        json_str = response_text.strip()

    parsed_json = json.loads(json_str)
    return parsed_json

def build_context(docs):
    return "\n\n".join([doc.page_content for doc in docs])

def retrieve_context(vector_db, query):
    res = vector_db.similarity_search(query, k=10)
    return res

def load_chroma(session_id):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=api_key
    )
    vector_db = Chroma(persist_directory=f"./chroma_db/{session_id}", embedding_function=embeddings)
    return vector_db

def agent2_(session_id):
    vector_db = load_chroma(session_id)
    docs = retrieve_context(vector_db, query="Summarize the entire patient history and health reports.")
    context = build_context(docs)
    insights_ = generate_insights(context)
    # print("Here agent2")
    return insights_

# # Testing
# if __name__ == "__main__":
#     session_id = "0864abfd-4b0c-4cf2-a887-b5a59fd2828b"
#     insights = agent2_(session_id)
#     print(insights)