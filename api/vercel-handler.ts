import app from './index.js';

export default async function handler(req: any, res: any) {
  // Create mock request/response for Express compatibility
  const originalUrl = req.url;
  req.url = req.url.replace(/^\/api/, '');
  
  await new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) reject(err);
      else resolve(null);
    });
  });
}
