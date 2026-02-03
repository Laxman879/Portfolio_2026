# Gmail App Password Setup Guide

The "Email delivery failed" error usually happens because Gmail blocks login attempts from third-party apps unless you use an **App Password**. Your current password in `.env.local` appears to be 15 characters long, but it should be **16 characters**.

Follow these exact steps to fix it:

## Step 1: Enable 2-Step Verification
1. Go to your [Google Account Security Page](https://myaccount.google.com/security).
2. Scroll to "How you sign in to Google".
3. Ensure **2-Step Verification** is turned **ON**. (This is required to generate an App Password).

## Step 2: Generate an App Password
1. In the search bar at the top of the Google Account page, type **"App passwords"** and click the result.
   - *Alternatively, look for "App passwords" under the "2-Step Verification" section.*
2. You may be asked to sign in again.
3. Under "App name", type `Portfolio` and click **Create**.
4. A popup will show a **16-character code** (e.g., `abcd efgh ijkl mnop`).
5. **COPY** this code.

## Step 3: Update Your Project
1. Open the file `.env.local` in your project.
2. Find the line starting with `SMTP_PASS=`.
3. Replace the value with your new 16-character code. **Remove all spaces**.
   
   **Correct Example:**
   ```env
   SMTP_PASS=abcdefghijklmnop
   ```

   **Incorrect Examples:**
   ```env
   SMTP_PASS=abcd efgh ijkl mnop  (Do not include spaces)
   SMTP_PASS=password123          (Do not use your regular Gmail password)
   ```

## Step 4: Restart the Server (Crucial!)
1. Go to your terminal where `npm run dev` is running.
2. Press `Ctrl + C` to stop the server.
3. Run `npm run dev` again.
   - *Environment variables are only loaded when the server starts. If you don't restart, the new password won't be used.*

## Step 5: Test
1. Go back to your Portfolio contact form.
2. Refresh the page.
3. fill out the form and click Send.
