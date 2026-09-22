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

def chunk_texts(docs):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    return splitter.split_documents(docs)


def fetch_and_extract_pdf_text(cloudinary_url):
    response = requests.get(cloudinary_url)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(response.content)
        loader = PyPDFLoader(tmp_file.name)
        docs = loader.load()
    return docs

def report_(pdf_link):
    doc = []

    pdf_doc = fetch_and_extract_pdf_text(pdf_link)
    doc.extend(pdf_doc)
    
    # Chunking
    chunked_docs = chunk_texts(doc)

    # store to chroma
    session_id, _ = store_chroma(chunked_docs)


    return session_id

