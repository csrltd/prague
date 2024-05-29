def email_template(first_name,last_name,email,phone,message):
    
    return f"""<!DOCTYPE html>
<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }}
        .email-container {{
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }}
        .header {{
            background-color: #f8f9fa;
            padding: 10px 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom: solid 1px #dee2e6;
        }}
        .content {{
            padding: 20px;
        }}
        .footer {{
            text-align: center;
            padding: 10px 20px;
            color: #6c757d;
            font-size: 12px;
        }}
        .info {{
            background-color: #e9ecef;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2>Contact Form Submission</h2>
        </div>
        <div class="content">
            <p>You have received a new message from the contact form on your website:</p>
            <div class="info">
                <strong>First Name:</strong> {first_name}
            </div>
            <div class="info">
                <strong>Last Name:</strong> {last_name}
            </div>
            <div class="info">
                <strong>Email:</strong> {email}
            </div>
             <div class="info">
                <strong>Phone Number:</strong> {phone}
            </div>
            <div class="info">
                <strong>Message:</strong>
                <p>{message}</p>
            </div>
        </div>
        <div class="footer">
            This is an automated message. Please do not reply directly to this email.
        </div>
    </div>
</body>
</html>
"""
