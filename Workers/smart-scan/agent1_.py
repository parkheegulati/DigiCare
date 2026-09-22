'''
Data Preparation Agent1_
'''
from langchain_community.document_loaders import PyPDFLoader
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
import uuid
import requests
import tempfile
import json
from dotenv import load_dotenv
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# PDF text Fetch
def fetch_and_extract_pdf_text(cloudinary_url):
    response = requests.get(cloudinary_url)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(response.content)
        loader = PyPDFLoader(tmp_file.name)
        docs = loader.load()
    return docs

# Json data to chunk
def parse_json(json_data):
    chunks = []
    for key, value in json_data.items():
        chunks.append(f"{key}: {value}")
    return chunks

# Chunking text
def chunk_texts(docs):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    return splitter.split_documents(docs)

# Creating embeddings and storing in Chroma
def store_chroma(docs, collection_name=None):

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=api_key
    )
    session_id = collection_name or str(uuid.uuid4())
    persist_directory = f"./chroma_db/{session_id}"

    vector_db = Chroma.from_documents(
        docs, 
        embedding=embeddings, 
        persist_directory=persist_directory
    )
    retrieved_docs = vector_db.get()
    return session_id, vector_db

def agent1_(json_data):
    all_docs = []

    # JSON data processing
    json_chunks = parse_json(json_data)
    json_docs = [Document(page_content=chunk) for chunk in json_chunks]
    all_docs.extend(json_docs)

    # PDF links processing
    pdf_links = json_data.get("documents", [])
    for pdf_link in pdf_links:
        pdf_docs = fetch_and_extract_pdf_text(pdf_link)
        all_docs.extend(pdf_docs)

    # Chunking
    chunked_docs = chunk_texts(all_docs)

    # Store to Chroma
    session_id, _ = store_chroma(chunked_docs)
    print("Here agent1")
    return session_id

# # Testing 
# if __name__ == "__main__":
    # json_input = {
    #     "fullName": "Joycee Mittal",
    #     "age": 56,
    #     "gender": "Female",
    #     "bloodGroup": "AB+",
    #     "dateOfBirth": "1968-02-24",
    #     "medicalHistory": "Has some Asthma Problems",
    #     "currentMedications": "Has taken medicines for Asthma",
    #     "familyMedicalHistory": "All Good",
    #     "documents": [
    #         "https://res.cloudinary.com/df0v2yuha/raw/upload/v1744267357/patients/documents/hlx6mwsnhsiebkeo91lg"
    #     ],
    #     "summary": []
    # }
#     session = agent1_(json_input)
#     print("ChromaDB session created:", session)
# # print("Agent 1 is ready to process data.")