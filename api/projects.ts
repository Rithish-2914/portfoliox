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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category, search } = req.query;

    let rows: any[];

    if (search && typeof search === 'string') {
      const searchPattern = `%${search.toLowerCase()}%`;
      rows = await sql`
        SELECT * FROM projects 
        WHERE LOWER(name) LIKE ${searchPattern} 
           OR LOWER(description) LIKE ${searchPattern}
           OR LOWER(technologies) LIKE ${searchPattern}
        ORDER BY id
      `;
    } else if (category && typeof category === 'string' && category !== 'all') {
      rows = await sql`
        SELECT * FROM projects 
        WHERE category = ${category}
        ORDER BY id
      `;
    } else {
      rows = await sql`SELECT * FROM projects ORDER BY id`;
    }

    const projects = rows.map(parseProject);
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Failed to fetch projects' });
  }
}
