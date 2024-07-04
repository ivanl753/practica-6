const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'your_mongodb_connection_uri';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('RD');
        const provincias = database.collection('Provincias');

        const provinciasArray = [
            { nombre: 'Santo Domingo' },
            { nombre: 'Distrito Nacional' },
            { nombre: 'Santiago' },
            { nombre: 'La Vega' },
            // Agrega más provincias aquí
        ];

        const result = await provincias.insertMany(provinciasArray);
        console.log(`${result.insertedCount} provincias fueron insertadas.`);

        // Consulta y muestra todas las provincias
        const allProvincias = await provincias.find({}).toArray();
        console.log('Provincias en la base de datos:');
        allProvincias.forEach(provincia => console.log(provincia.nombre));
    } finally {
        await client.close();
    }
}

main().catch(console.error);

