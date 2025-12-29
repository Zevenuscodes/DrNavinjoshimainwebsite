# Quick Vercel Deployment Fix

If your changes aren't showing on the live site, follow these steps:

## Option 1: Automatic Redeploy (if connected to GitHub)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to the **Deployments** tab
4. Find the latest deployment
5. Click the **three dots (⋯)** menu
6. Click **Redeploy**
7. Wait for deployment to complete (usually 1-2 minutes)

## Option 2: Manual Trigger via GitHub

If automatic deployment isn't working:

1. Go to your GitHub repository
2. Make a small change (like adding a space in README)
3. Commit and push
4. This will trigger a new deployment

## Option 3: Force Redeploy via Vercel CLI

If you have Vercel CLI installed:

```bash
vercel --prod
```

## Check Deployment Status

1. Go to Vercel Dashboard → Your Project → Deployments
2. Check if the latest deployment:
   - Shows your latest commit hash (9402c16)
   - Has a green checkmark (✓)
   - Shows "Ready" status

## Common Issues

### Issue: Deployment shows "Building" for too long
- **Solution**: Check the build logs for errors
- Look for any missing environment variables

### Issue: Deployment succeeded but changes not visible
- **Solution**: 
  - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
  - Try incognito/private browsing mode
  - Check if you're looking at the correct URL

### Issue: Build failed
- **Solution**: 
  - Check build logs in Vercel
  - Ensure all environment variables are set
  - Check for any TypeScript/compilation errors

## Verify Changes

After redeploying, check:
- Visit: `https://your-domain.com/marketing/workshops`
- Scroll down to "Offline Workshops" section
- You should see the new workshop details

