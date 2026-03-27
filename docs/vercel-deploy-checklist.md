# Vercel Deployment Checklist

1. Connect the repository to Vercel.
2. Set production environment variables from `.env.example`.
3. Ensure the Google service account has edit access to the target sheet.
4. Verify `/api/rsvp` and `/api/rsvp-count` return expected JSON in production.
5. Confirm PWA install prompt appears on supported mobile browsers.
6. Test offline revisit by enabling airplane mode after first load.
7. Point custom domain DNS to Vercel and verify HTTPS is active.
