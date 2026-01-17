from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import io


router = APIRouter()

def extract_text_from_pdf(file_bytes):
    """
    Helper function to extract raw text from a PDF file stream.
    """
    try:
        # pdfplumber.open expects a path or a file-like object
        # storing data as pdf variable
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = ""
            # extract data from all pages 
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return None


# check if file is pdf 
@router.post("/api/upload")
async def upload_resume(file: UploadFile = File(...)):
    # Validate File Type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF is supported for now.")

    #  Read the file content
    content = await file.read()

    # Extract Text
    raw_text = extract_text_from_pdf(content)
    
    if not raw_text:
        raise HTTPException(status_code=400, detail="Could not extract text from this PDF.")

    # 4. Return the raw text (for testing purposes)
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "raw_text_preview": raw_text[:500] + "...", # Show first 500 chars
        "full_text_length": len(raw_text),
        "full_text": raw_text
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)