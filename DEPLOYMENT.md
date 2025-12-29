# Deployment Guide - Admin Dashboard

This guide will help you deploy the admin dashboard to your live website (Vercel).

## Prerequisites

1. ✅ Code is pushed to GitHub (already done)
2. ✅ Firebase project is set up
3. ✅ Firebase Authentication is enabled
4. ✅ Firestore Database is enabled
5. ✅ Firebase Storage is enabled

## Step 1: Deploy to Vercel

### Option A: If you already have Vercel connected

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all the environment variables (see Step 2 below)
5. Go to **Deployments** tab
6. Click **Redeploy** on the latest deployment

### Option B: If this is a new deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Add environment variables (see Step 2)
6. Click **Deploy**

## Step 2: Add Environment Variables to Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Admin Email
```
NEXT_PUBLIC_ADMIN_EMAIL=ayushdarpan@gmail.com
```

**Important:**
- Add these for **Production**, **Preview**, and **Development** environments
- Use the same values from your `.env.local` file
- After adding variables, **redeploy** your application

## Step 3: Configure Firebase for Production

### 3.1 Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Sign-in method**
4. Enable **Email/Password** (if not already enabled)
5. Enable **Google** (if you want Google sign-in)
6. Go to **Settings** → **Authorized domains**
7. Add your Vercel domain (e.g., `your-project.vercel.app`)

### 3.2 Firestore Security Rules

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Courses collection - read public, write admin only
    match /courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email.matches('.*@(drnavinjoshi\\.com|gmail\\.com)$');
    }
    
    // Homepage collection - read public, write admin only
    match /homepage/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email.matches('.*@(drnavinjoshi\\.com|gmail\\.com)$');
    }
  }
}
```

### 3.3 Storage Security Rules

Go to **Storage** → **Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email.matches('.*@(drnavinjoshi\\.com|gmail\\.com)$');
    }
  }
}
```

## Step 4: Create Admin User in Firebase

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email: `ayushdarpan@gmail.com`
4. Set a secure password
5. Click **Add user**

## Step 5: Verify Deployment

1. Visit your live website: `https://your-domain.com/admin/login`
2. Try logging in with your admin credentials
3. Verify all features work:
   - ✅ Login works
   - ✅ Dashboard loads
   - ✅ Courses can be created/edited
   - ✅ Homepage content can be edited
   - ✅ Media uploads work
   - ✅ Slideshow images can be managed

## Troubleshooting

### Issue: "Firebase configuration error"
- **Solution**: Check that all environment variables are set in Vercel
- Redeploy after adding variables

### Issue: "Access denied. Admin email required"
- **Solution**: Make sure `NEXT_PUBLIC_ADMIN_EMAIL` matches the email you're using to log in
- Check that the email is whitelisted in `lib/firebase/auth.ts`

### Issue: "Cannot upload images"
- **Solution**: Check Firebase Storage rules allow writes
- Verify Storage is enabled in Firebase Console

### Issue: "Login redirects to login page"
- **Solution**: Check middleware is working
- Verify session cookies are being set

## Post-Deployment Checklist

- [ ] Environment variables added to Vercel
- [ ] Firebase authorized domains updated
- [ ] Firestore rules configured
- [ ] Storage rules configured
- [ ] Admin user created in Firebase
- [ ] Test login on production
- [ ] Test all admin features
- [ ] Verify images upload correctly
- [ ] Check that public pages still work

## Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify Firebase Console for authentication errors
4. Ensure all environment variables are correctly set

