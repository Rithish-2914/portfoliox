import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  sourceCodeUrl: string;
  liveDemoUrl: string;
  htmlCode: string | null;
  cssCode: string | null;
  jsCode: string | null;
}

function parseProject(row: any): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    technologies: typeof row.technologies === 'string' ? JSON.parse(row.technologies) : row.technologies,
    features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
    sourceCodeUrl: row.source_code_url,
    liveDemoUrl: row.live_demo_url,
    htmlCode: row.html_code,
    cssCode: row.css_code,
    jsCode: row.js_code,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const projectId = parseInt(id as string, 10);

  if (isNaN(projectId)) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json(parseProject(rows[0]));
    }

    if (req.method === 'PATCH') {
      const { htmlCode, cssCode, jsCode } = req.body;

      const updates: string[] = [];
      const values: any[] = [];

      if (htmlCode !== undefined) {
        updates.push('html_code');
        values.push(htmlCode);
      }
      if (cssCode !== undefined) {
        updates.push('css_code');
        values.push(cssCode);
      }
      if (jsCode !== undefined) {
        updates.push('js_code');
        values.push(jsCode);
      }

      if (updates.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }

      await sql`
        UPDATE projects 
        SET 
          html_code = COALESCE(${htmlCode ?? null}, html_code),
          css_code = COALESCE(${cssCode ?? null}, css_code),
          js_code = COALESCE(${jsCode ?? null}, js_code)
        WHERE id = ${projectId}
      `;

      const rows = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json(parseProject(rows[0]));
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling project:', error);
    return res.status(500).json({ message: 'Failed to process request' });
  }
}
