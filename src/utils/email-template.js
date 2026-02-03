export const generateContactEmail = ({ name, email, phone, message }) => {
  const currentYear = new Date().getFullYear();
  const portfolioName = "Laxman's Portfolio"; 
  const trackingId = Math.random().toString(36).substring(2, 10).toUpperCase();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact Message</title>
</head>
<body style="margin:0; padding:0; background-color:#0B1120; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#0B1120; padding:20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <!-- Surface color #151E32, with a subtle border and shadow -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background:#151E32; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.4); border: 1px solid #1F2933;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(180deg, #1A2338 0%, #151E32 100%); padding:40px 32px 32px; text-align:center; border-bottom:1px solid #1F2933;">
              <h1 style="margin:0; font-size:28px; font-weight:700; color:#FFFFFF; letter-spacing:-0.5px;">
                <span style="display:inline-block; vertical-align:middle; margin-right:4px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00B894" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom;">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span> Portfolio Contact Form
              </h1>
              <p style="margin:8px 0 0; color:#9AA5B1; font-size:15px;">
                You received a new inquiry from Laxman's Portfolio
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 32px; color:#CBD2D9;">
              
              <!-- Tracking ID Tag -->
              <div style="margin-bottom:32px; text-align:center;">
                 <span style="background:#1F2933; color:#00B894; border:1px solid #00B894; padding:6px 16px; border-radius:100px; font-size:12px; font-family:monospace; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
                   #${trackingId}
                 </span>
              </div>
              
              <!-- Details Card -->
              <div style="background:#1F2933; border-radius:12px; padding:24px; border:1px solid #2D3748; margin-bottom:32px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding-bottom:16px; width:100px; font-weight:600; color:#7B8794; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Name :</td>
                    <td style="padding-bottom:16px; color:#FFFFFF; font-weight:500; font-size:15px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:16px; font-weight:600; color:#7B8794; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Email :</td>
                    <td style="padding-bottom:16px; color:#FFFFFF; font-weight:500; font-size:15px;">
                      <a href="mailto:${email}" style="color:#00B894; text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:600; color:#7B8794; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Phone :</td>
                    <td style="color:#FFFFFF; font-weight:500; font-size:15px;">${phone}</td>
                  </tr>
                </table>
              </div>

              <!-- Message Section -->
              <div>
                <p style="margin:0 0 16px; font-weight:600; color:#FFFFFF; font-size:16px;">Message</p>
                <div style="background:rgba(0, 184, 148, 0.05); border-left:3px solid #00B894; padding:20px; color:#E4E7EB; line-height:1.7; border-radius:0 8px 8px 0; font-size:15px;">
                  "${message.replace(/\n/g, '<br>')}"
                </div>
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding:0 32px 48px; text-align:center;">
              <!-- Primary Button matching site's #00B894 -->
              <a href="mailto:${email}" style="display:inline-block; background:#00B894; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:8px; font-weight:600; font-size:15px; box-shadow:0 4px 14px rgba(0, 184, 148, 0.4); transition:transform 0.2s;">
                Reply via Email
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0F1623; padding:24px; text-align:center; border-top:1px solid #1F2933;">
              <p style="margin:0; font-size:12px; color:#616E7C; line-height:1.6;">
                This secure message was sent from your portfolio.<br>
                &copy; ${currentYear} <span style="color:#00B894;">${portfolioName}</span>.
              </p>
            </td>
          </tr>

        </table>
        
        <!-- Branding text below -->
        <p style="margin-top:24px; color:#323F4B; font-size:12px;">
          Designed with Portfolio UI
        </p>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};
