from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor
import os
from datetime import datetime
from io import BytesIO
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse

def format_key_as_title(key):
    """Convert snake_case to Title Case with proper spacing."""
    return key.replace("_", " ").title()

def style_number_data(value):
    """Format numeric values with highlighting."""
    try:
        # Check if value is numeric or can be converted to a number
        if isinstance(value, (int, float)) or (
            isinstance(value, str) and value.strip() and 
            value.replace('.', '', 1).replace('-', '', 1).isdigit()
        ):
            return f'<b><font color="#0B6FA4">{value}</font></b>'
    except (ValueError, TypeError):
        pass
    
    # Return as string for non-numeric values
    return str(value) if value is not None else ""

def is_meaningful_data(value):
    """Check if the value contains meaningful data."""
    if value is None:
        return False
    if isinstance(value, str) and value.strip() == "":
        return False
    if isinstance(value, (list, dict)) and len(value) == 0:
        return False
    return True

def process_nested_data(data, styles, level=0):
    """Process nested data structures recursively."""
    elements = []
    indent = "&nbsp;" * (level * 4)  # Add indentation for nested items
    
    if isinstance(data, dict):
        for key, value in data.items():
            if is_meaningful_data(value):  # Check if value is meaningful
                if isinstance(value, (dict, list)):
                    # Add section header
                    elements.append(Paragraph(
                        f"{indent}<b>{format_key_as_title(key)}:</b>", 
                        styles['SectionStyle']
                    ))
                    # Process nested data with increased indentation
                    elements.extend(process_nested_data(value, styles, level + 1))
                else:
                    # Add key-value pair
                    elements.append(Paragraph(
                        f"{indent}<b>{format_key_as_title(key)}:</b> {style_number_data(value)}", 
                        styles['SectionStyle']
                    ))
    elif isinstance(data, list):
        for i, item in enumerate(data):
            if is_meaningful_data(item):  # Check if item is meaningful
                if isinstance(item, (dict, list)):
                    if level > 0:  # Only add item numbers for nested lists
                        elements.append(Paragraph(
                            f"{indent}<b>Item {i+1}:</b>", 
                            styles['SectionStyle']
                        ))
                    elements.extend(process_nested_data(item, styles, level + 1))
                else:
                    # Add simple list item
                    elements.append(Paragraph(
                        f"{indent}• {style_number_data(item)}", 
                        styles['SectionStyle']
                    ))
    else:
        # Handle simple values directly (for top-level string values)
        elements.append(Paragraph(
            f"{indent}{style_number_data(data)}", 
            styles['SectionStyle']
        ))
    
    return elements

def agent3_(json_data, output_path=None, title="Medical Insight Report"):
    """Generate a structured PDF from JSON data with improved formatting."""
    # Set default filename if not provided
    if output_path is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f"medical_report_{timestamp}.pdf"
    
    # Create document
    doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=50, leftMargin=50, 
                           topMargin=50, bottomMargin=50)
    
    # Define styles
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name='TitleStyle',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=HexColor("#0B6FA4"),
        alignment=TA_CENTER,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='SectionStyle',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=6,
        leading=14  # Control line spacing
    ))
    
    styles.add(ParagraphStyle(
        name='MainHeading',
        parent=styles['Heading2'],
        fontSize=12,
        textColor=HexColor("#333333"),
        spaceAfter=8,
        spaceBefore=12
    ))
    
    # Create document elements
    elements = []
    
    # Add title
    elements.append(Paragraph(title, styles['TitleStyle']))
    elements.append(Spacer(1, 12))
    
    # Add timestamp
    date_str = datetime.now().strftime("%B %d, %Y - %H:%M")
    elements.append(Paragraph(f"Generated: {date_str}", styles['SectionStyle']))
    elements.append(Spacer(1, 12))
    
    # Process top-level items, only adding sections that have data
    for key, value in json_data.items():
        if is_meaningful_data(value):  # Using the improved check
            # Add main section header
            elements.append(Paragraph(format_key_as_title(key), styles['MainHeading']))
            
            # Process section content
            elements.extend(process_nested_data(value, styles))
            elements.append(Spacer(1, 8))
    
    # Build document
    buffer = BytesIO()
    try:
        doc = SimpleDocTemplate(buffer, pagesize=A4)  # or use your layout
        doc.build(elements)
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=report.pdf"
            }
        )
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")
        return {"error": "Failed to generate PDF"}

# Test the function
# if __name__ == "__main__":
#     json_data = {
#         "patient_summary": "Ms. Joycee Mittal, a 56-year-old female, presented for a health check-up.  She reports a history of home asthma problems and has been taking medication for it.  Family medical history is reported as 'All Good'.",
#         "timeline": [
#             {
#             "date": "11/2/2025",
#             "event": "Blood test (SwasthFit Super 1, Liver & Kidney Panel)",
#             "finding": "Results show Creatinine (0.49 mg/dL), eGFR (estimated glomerular filtration rate) >59 mL/min/1.73m2 (G1 category), Urea (24.20 mg/dL), Urea Nitrogen (11.30 mg/dL), BUN/Creatinine Ratio (23), and Uric Acid (5.97 mg/dL). AST (SGOT) level is 25.0."
#             }
#         ],
#         "previous_medications": [
#             "Asthma medication"
#         ],
#         "current_health_status": "Patient reports home asthma problems.  Blood test reveals slightly elevated Urea, Urea Nitrogen, and Uric Acid levels. Creatinine and eGFR are within the normal range. AST is slightly elevated.  Further investigation may be needed to determine the significance of these findings.",
#         "allergies": [],
#         "family_history": "All Good (reported)",
#         "test_results": {
#             "blood_test": {
#             "Creatinine": "0.49 mg/dL (0.51 - 0.95 mg/dL)",
#             "eGFR": ">59 mL/min/1.73m2 (G1 category)",
#             "Urea": "24.20 mg/dL (17.00 - 43.00 mg/dL)",
#             "Urea Nitrogen": "11.30 mg/dL (6.00 - 20.00 mg/dL)",
#             "BUN/Creatinine Ratio": "23",
#             "Uric Acid": "5.97 mg/dL (2.60 - 6.00 mg/dL)",
#             "AST (SGOT)": "25.0"
#             },
#             "culture_test": [],
#             "imaging": []
#         },
#         "recommendations": [
#             "Review patient's asthma management plan.",
#             "Assess the significance of slightly elevated Urea, Urea Nitrogen, and Uric Acid levels. Consider further investigation to rule out underlying causes such as dehydration, diet, or kidney function issues.  A repeat blood test might be beneficial.",
#             "Evaluate the slightly elevated AST level.  Consider liver function tests to assess liver health.",
#             "Discuss lifestyle modifications, including diet and hydration, to manage elevated uric acid and potentially improve other blood markers.",
#             "Patient should be advised to follow up with her physician for further evaluation and management."
#         ]
#     }
#     output_path = agent3_(json_data)
#     print(f"PDF generated at: {output_path}")