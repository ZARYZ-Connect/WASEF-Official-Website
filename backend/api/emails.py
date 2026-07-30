import logging
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

logger = logging.getLogger(__name__)

def get_service_display(inquiry):
    if inquiry.service_interest:
        return getattr(inquiry.service_interest, 'title', str(inquiry.service_interest))
    if hasattr(inquiry, '_raw_service') and inquiry._raw_service:
        return str(inquiry._raw_service).replace('-', ' ').title()
    return "General Manufacturing Inquiry"

def get_sender_confirmation_html(inquiry):
    inquiry_type_label = inquiry.get_inquiry_type_display() if hasattr(inquiry, 'get_inquiry_type_display') else inquiry.inquiry_type
    company_info = f" ({inquiry.company})" if inquiry.company else ""
    service_info = get_service_display(inquiry)
    
    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Confirmation — WASEF & KS INDUSTRIES</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; color: #1e293b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0b1329; padding: 32px 40px; text-align: left; border-bottom: 4px solid #f5a623;">
                            <table role="presentation" width="100%">
                                <tr>
                                    <td>
                                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; tracking-spacing: 1px;">
                                            WASEF &amp; KS <span style="color: #f5a623;">INDUSTRIES</span>
                                        </h1>
                                        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">Precision Engineering & Laser Cut Systems</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #0b1329; margin-top: 0; font-size: 20px; font-weight: 700;">
                                Thank You for Reaching Out, {inquiry.name}!
                            </h2>
                            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
                                We have successfully received your <strong>{inquiry_type_label}</strong> submission. Our engineering and quote evaluation team has been notified and is currently reviewing your project specifications.
                            </p>

                            <!-- Submission Summary Card -->
                            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f5a623; border-radius: 6px; padding: 20px; margin-bottom: 28px;">
                                <h3 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Summary of Your Submission</h3>
                                <table role="presentation" width="100%" style="font-size: 14px; color: #334155; line-height: 1.8;">
                                    <tr>
                                        <td width="35%" style="font-weight: 600; color: #64748b;">Full Name:</td>
                                        <td>{inquiry.name}{company_info}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 600; color: #64748b;">Email Address:</td>
                                        <td>{inquiry.email}</td>
                                    </tr>
                                    {f'<tr><td style="font-weight: 600; color: #64748b;">Phone:</td><td>{inquiry.phone}</td></tr>' if inquiry.phone else ''}
                                    <tr>
                                        <td style="font-weight: 600; color: #64748b;">Inquiry Type:</td>
                                        <td><span style="background-color: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">{inquiry_type_label}</span></td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 600; color: #64748b;">Service of Interest:</td>
                                        <td>{service_info}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: 600; color: #64748b; vertical-align: top; padding-top: 4px;">Requirements:</td>
                                        <td style="vertical-align: top; padding-top: 4px; white-space: pre-wrap; font-family: inherit;">{inquiry.message}</td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Next Steps -->
                            <div style="margin-bottom: 28px;">
                                <h3 style="font-size: 16px; color: #0b1329; margin-bottom: 12px; font-weight: 700;">What Happens Next?</h3>
                                <ul style="padding-left: 20px; margin: 0; color: #475569; font-size: 14px; line-height: 1.7;">
                                    <li><strong>Engineering Review:</strong> Our technical team will analyze your CAD/specs and materials requirements.</li>
                                    <li><strong>Prompt Response:</strong> A dedicated sales engineer will contact you within <strong>24 business hours</strong> with a formal quote or technical response.</li>
                                    <li><strong>Need urgent assistance?</strong> Call our direct desk at <a href="tel:+918012345678" style="color: #d97706; text-decoration: none; font-weight: 600;">+91 80 1234 5678</a>.</li>
                                </ul>
                            </div>

                            <p style="font-size: 14px; color: #64748b; margin-top: 30px; margin-bottom: 0;">
                                Best regards,<br>
                                <strong style="color: #0b1329;">The Engineering Team</strong><br>
                                WASEF &amp; KS INDUSTRIES Pvt. Ltd.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                            <p style="margin: 0;">WASEF &amp; KS INDUSTRIES Pvt. Ltd. • Industrial Area, Phase II, Bangalore, KA 560058, India</p>
                            <p style="margin: 4px 0 0 0;">This is an automated confirmation of your inquiry submission.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>"""

def get_receiver_notification_html(inquiry):
    inquiry_type_label = inquiry.get_inquiry_type_display() if hasattr(inquiry, 'get_inquiry_type_display') else inquiry.inquiry_type
    created_at_str = inquiry.created_at.strftime("%B %d, %Y at %I:%M %p IST") if hasattr(inquiry, 'created_at') and inquiry.created_at else "Just now"
    service_info = get_service_display(inquiry)

    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Website Inquiry — WASEF & KS INDUSTRIES</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; color: #1e293b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #cbd5e1;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0b1329; padding: 24px 32px; text-align: left; border-bottom: 4px solid #f5a623;">
                            <table role="presentation" width="100%">
                                <tr>
                                    <td>
                                        <span style="background-color: #f5a623; color: #0b1329; padding: 3px 10px; border-radius: 4px; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 8px;">
                                            NEW INQUIRY RECEIVED
                                        </span>
                                        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">
                                            {inquiry_type_label}: {inquiry.name} {f'({inquiry.company})' if inquiry.company else ''}
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 32px;">
                            <p style="font-size: 14px; color: #64748b; margin-top: 0; margin-bottom: 20px;">
                                A new website inquiry has been submitted at <strong>{created_at_str}</strong>.
                            </p>

                            <!-- Data Table -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="10" style="font-size: 14px; color: #1e293b; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <td width="30%" style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">Full Name</td>
                                    <td style="font-weight: 600; color: #0f172a;">{inquiry.name}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">Company</td>
                                    <td>{inquiry.company or 'N/A'}</td>
                                </tr>
                                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <td style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">Email Address</td>
                                    <td><a href="mailto:{inquiry.email}" style="color: #2563eb; font-weight: 600; text-decoration: underline;">{inquiry.email}</a></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">Phone Number</td>
                                    <td>{f'<a href="tel:{inquiry.phone}" style="color: #0f172a; text-decoration: none;">{inquiry.phone}</a>' if inquiry.phone else 'N/A'}</td>
                                </tr>
                                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <td style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">Inquiry Type</td>
                                    <td><strong style="color: #b45309;">{inquiry_type_label}</strong></td>
                                </tr>
                                <tr style="border-bottom: 1px solid #e2e8f0;">
                                    <td style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">Service Interest</td>
                                    <td>{service_info}</td>
                                </tr>
                                <tr style="background-color: #f8fafc;">
                                    <td style="font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0; vertical-align: top;">Requirements / Message</td>
                                    <td style="white-space: pre-wrap; line-height: 1.6; color: #0f172a;">{inquiry.message}</td>
                                </tr>
                            </table>

                            <!-- Reply CTA -->
                            <div style="text-align: center; margin-top: 28px; margin-bottom: 12px;">
                                <a href="mailto:{inquiry.email}?subject=Re:%20WASEF%20and%20KS%20INDUSTRIES%20Inquiry%20-{inquiry_type_label}" 
                                   style="background-color: #f5a623; color: #0b1329; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 10px rgba(245,166,35,0.3);">
                                    Reply to Customer ({inquiry.email}) →
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
                            WASEF &amp; KS INDUSTRIES Web Portal Notification System
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>"""


def send_inquiry_emails(inquiry):
    """
    Sends both:
    1. Notification email to company receiver (likithrock108@gmail.com)
    2. Confirmation email to the user/sender who submitted the form
    """
    inquiry_type_label = inquiry.get_inquiry_type_display() if hasattr(inquiry, 'get_inquiry_type_display') else inquiry.inquiry_type
    service_info = get_service_display(inquiry)

    # 1. Receiver / Company Notification Email
    receiver_email = getattr(settings, 'CONTACT_NOTIFICATION_EMAIL', 'likithrock108@gmail.com')
    receiver_subject = f"[New Inquiry] {inquiry_type_label} from {inquiry.name} ({inquiry.company or 'Direct'})"
    receiver_text = f"New Inquiry Received:\nName: {inquiry.name}\nCompany: {inquiry.company}\nEmail: {inquiry.email}\nPhone: {inquiry.phone}\nType: {inquiry_type_label}\nService: {service_info}\n\nMessage:\n{inquiry.message}"
    receiver_html = get_receiver_notification_html(inquiry)

    try:
        msg_company = EmailMultiAlternatives(
            subject=receiver_subject,
            body=receiver_text,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[receiver_email],
            reply_to=[inquiry.email]
        )
        msg_company.attach_alternative(receiver_html, "text/html")
        msg_company.send(fail_silently=True)
        logger.info(f"Notification email dispatched to company receiver ({receiver_email}).")
    except Exception as e:
        logger.error(f"Failed to send company notification email: {e}")

    # 2. Sender / Customer Confirmation Email
    sender_subject = f"We have received your inquiry — WASEF & KS INDUSTRIES"
    sender_text = f"Hello {inquiry.name},\n\nThank you for reaching out to WASEF & KS INDUSTRIES. We have received your {inquiry_type_label} request.\n\nOur engineering team will review your specifications and get back to you within 24 business hours.\n\nBest regards,\nWASEF & KS INDUSTRIES Team"
    sender_html = get_sender_confirmation_html(inquiry)

    try:
        msg_customer = EmailMultiAlternatives(
            subject=sender_subject,
            body=sender_text,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[inquiry.email]
        )
        msg_customer.attach_alternative(sender_html, "text/html")
        msg_customer.send(fail_silently=True)
        logger.info(f"Confirmation email dispatched to sender ({inquiry.email}).")
    except Exception as e:
        logger.error(f"Failed to send sender confirmation email: {e}")
