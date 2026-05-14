from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import List
import requests
import asyncio
import os
from datetime import date

from agent1_ import agent1_
from agent2_ import agent2_
from agent3_ import agent3_

app = FastAPI()


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Request schema
class ScanRequest(BaseModel):
    fullName: str
    age: int
    gender: str
    bloodGroup: str
    dateOfBirth: date
    medicalHistory: str
    currentMedications: str
    familyMedicalHistory: str
    documents: List[HttpUrl]
    summary: List[str]

# Async wrappers
async def async_agent1_(data): return agent1_(data)
async def async_agent2_(data): return agent2_(data)
async def async_agent3_(data): return agent3_(data)  # returns StreamingResponse

# Pipeline
async def smart_scan_pipeline(json_data: dict):
    output1 = await async_agent1_(json_data)
    output2 = await async_agent2_(output1)
    response = await async_agent3_(output2)
    return response

# Endpoint
@app.post("/smartscan", response_class=StreamingResponse)
async def smart_scan(request: ScanRequest):
    try:
        return await smart_scan_pipeline(request.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scan failed: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Welcome to the Smart Scan API. Use /smartscan to initiate a scan."}
