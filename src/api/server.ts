import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Interfaces
interface DepartamentoData {
    nombre_departamento: string;
    codigo_departamento: string;
    [key: string]: string | number;
}

interface MunicipioData {
    nombre_municipio: string;
    codigo_municipio: string;
    id_departamento: number;
    [key: string]: string | number;
}

interface ColegioData {
    nombre_colegio: string;
    codigo_colegio: string;
    id_municipio: number;
    [key: string]: string | number;
}

interface SedeData {
    nombre_sede: string;
    codigo_sede: string;
    id_colegio: number;
    [key: string]: string | number;
}

interface UsuarioData {
    nombre: string;
    rol: string;
    [key: string]: string | number;
}

type RequestBody = Record<string, string | number>;

// Error handling middleware
const handleDatabaseError = (err: Error, res: any): void => {
    console.error('Database error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
};

// Validar datos requeridos en el cuerpo de la solicitud
const validateRequiredFields = (body: RequestBody, requiredFields: string[]): void => {
    for (const field of requiredFields) {
        if (!body[field]) {
            throw new Error(`Falta el campo requerido: ${field}`);
        }
    }
};

// Departamento endpoints
app.get('/api/departamentos', async (_req: any, res: any) => {
    try {
        console.log('Attempting to fetch departamentos...');
        const result = await pool.query('SELECT * FROM departamento');
        console.log('Query result:', result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching departamentos:', err);
        handleDatabaseError(err as Error, res);
    }
});

app.post('/api/departamentos', async (req: any, res: any) => {
    const { nombre_departamento, codigo_departamento } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_departamento', 'codigo_departamento']);
        const result = await pool.query(
            'INSERT INTO departamento (nombre_departamento, codigo_departamento) VALUES ($1, $2) RETURNING *',
            [nombre_departamento, codigo_departamento]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.put('/api/departamentos/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { nombre_departamento, codigo_departamento } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_departamento', 'codigo_departamento']);
        const result = await pool.query(
            'UPDATE departamento SET nombre_departamento = $1, codigo_departamento = $2 WHERE id = $3 RETURNING *',
            [nombre_departamento, codigo_departamento, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Departamento no encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.delete('/api/departamentos/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM departamento WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Departamento no encontrado' });
        } else {
            res.json({ message: 'Departamento eliminado exitosamente' });
        }
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

// Municipio endpoints
app.get('/api/municipios', async (_req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM municipio');
        res.json(result.rows);
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

app.post('/api/municipios', async (req: any, res: any) => {
    const { nombre_municipio, codigo_municipio, id_departamento } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_municipio', 'codigo_municipio', 'id_departamento']);
        const result = await pool.query(
            'INSERT INTO municipio (nombre_municipio, codigo_municipio, id_departamento) VALUES ($1, $2, $3) RETURNING *',
            [nombre_municipio, codigo_municipio, id_departamento]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.put('/api/municipios/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { nombre_municipio, codigo_municipio, id_departamento } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_municipio', 'codigo_municipio', 'id_departamento']);
        const result = await pool.query(
            'UPDATE municipio SET nombre_municipio = $1, codigo_municipio = $2, id_departamento = $3 WHERE id = $4 RETURNING *',
            [nombre_municipio, codigo_municipio, id_departamento, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Municipio no encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.delete('/api/municipios/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM municipio WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Municipio no encontrado' });
        } else {
            res.json({ message: 'Municipio eliminado exitosamente' });
        }
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

// Colegio endpoints
app.get('/api/colegios', async (_req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM colegio');
        res.json(result.rows);
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

app.post('/api/colegios', async (req: any, res: any) => {
    const { nombre_colegio, codigo_colegio, id_municipio } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_colegio', 'codigo_colegio', 'id_municipio']);
        const result = await pool.query(
            'INSERT INTO colegio (nombre_colegio, codigo_colegio, id_municipio) VALUES ($1, $2, $3) RETURNING *',
            [nombre_colegio, codigo_colegio, id_municipio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.put('/api/colegios/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { nombre_colegio, codigo_colegio, id_municipio } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_colegio', 'codigo_colegio', 'id_municipio']);
        const result = await pool.query(
            'UPDATE colegio SET nombre_colegio = $1, codigo_colegio = $2, id_municipio = $3 WHERE id = $4 RETURNING *',
            [nombre_colegio, codigo_colegio, id_municipio, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Colegio no encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.delete('/api/colegios/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM colegio WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Colegio no encontrado' });
        } else {
            res.json({ message: 'Colegio eliminado exitosamente' });
        }
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

// Sede endpoints
app.get('/api/sedes', async (_req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM sede');
        res.json(result.rows);
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

app.post('/api/sedes', async (req: any, res: any) => {
    const { nombre_sede, codigo_sede, id_colegio } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_sede', 'codigo_sede', 'id_colegio']);
        const result = await pool.query(
            'INSERT INTO sede (nombre_sede, codigo_sede, id_colegio) VALUES ($1, $2, $3) RETURNING *',
            [nombre_sede, codigo_sede, id_colegio]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.put('/api/sedes/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { nombre_sede, codigo_sede, id_colegio } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre_sede', 'codigo_sede', 'id_colegio']);
        const result = await pool.query(
            'UPDATE sede SET nombre_sede = $1, codigo_sede = $2, id_colegio = $3 WHERE id = $4 RETURNING *',
            [nombre_sede, codigo_sede, id_colegio, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Sede no encontrada' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.delete('/api/sedes/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM sede WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Sede no encontrada' });
        } else {
            res.json({ message: 'Sede eliminada exitosamente' });
        }
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

// Usuarios endpoints
app.get('/api/usuarios', async (_req: any, res: any) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

app.post('/api/usuarios', async (req: any, res: any) => {
    const { nombre, rol } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre', 'rol']);
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, rol) VALUES ($1, $2) RETURNING *',
            [nombre, rol]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.put('/api/usuarios/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { nombre, rol } = req.body;
    try {
        validateRequiredFields(req.body, ['nombre', 'rol']);
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, rol = $2 WHERE id = $3 RETURNING *',
            [nombre, rol, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        if (err instanceof Error && err.message.startsWith('Falta el campo requerido')) {
            res.status(400).json({ error: err.message });
        } else {
            handleDatabaseError(err as Error, res);
        }
    }
});

app.delete('/api/usuarios/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.json({ message: 'Usuario eliminado exitosamente' });
        }
    } catch (err) {
        handleDatabaseError(err as Error, res);
    }
});

// Test database connection
app.get('/api/test', async (_req: any, res: any) => {
    try {
        await pool.query('SELECT NOW()');
        res.json({ message: 'Database connection successful' });
    } catch (err) {
        console.error('Database connection test failed:', err);
        handleDatabaseError(err as Error, res);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
