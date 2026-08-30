# Vercel Edge Network Deployment

If you encounter a `404: NOT_FOUND` error immediately after deploying to Vercel (with an error code like `Code: NOT_FOUND` and an ID starting with a regional code like `bom1::`), this is a Vercel Edge Network routing error.

**Why does this happen?**
When Vercel finishes building your Next.js application, it distributes the static assets and serverless functions across its global Edge Network (CDN). Sometimes, the domain routing takes a minute or two to propagate globally. If you click the link the exact second the build finishes, the routing might not have reached your local edge node yet, resulting in a Vercel-level 404.

**How to fix:**
1. Wait 1-2 minutes.
2. Hard refresh the page (Ctrl + Shift + R or Cmd + Shift + R).
3. If it persists, check your Vercel Dashboard to ensure the deployment didn't fail and is marked as "Ready".
