# challengeOne

## Hugging Face Inference API

- Copy `.env.example` to `.env.local` and set `HUGGING_FACE_API_KEY` to your HF token.
- Start dev server: `npm run dev`.
- Test endpoint:

```bash
curl -s -X POST http://localhost:3000/api/hf \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hugging Face provides state-of-the-art NLP models accessible via simple APIs."}'
```

You should receive a JSON response with a summary from `facebook/bart-large-cnn`.
