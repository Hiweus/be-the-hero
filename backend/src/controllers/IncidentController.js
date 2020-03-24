const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
    
    async create (request, response) {
        const {title, value, description} = request.body;
        const ong_id = request.headers.authorization;

        const result = await connection("incidents").insert({
            title,
            value,
            description,
            ong_id
        });
        const id = result[0];
        return response.json({ id });
    },


    async index(request, response) {
        const {page = 1} = request.query;

        const [count]  = await connection("incidents").count();

        const incidents = await connection("incidents")
            .join("ongs", "ongs.id" , "=", "incidents.ong_id")
            .limit(5)
            .offset((page-1)*5)
            .select([
                "incidents.*",
                "ongs.name", 
                "ongs.email", 
                "ongs.whatsapp", 
                "ongs.uf", 
                "ongs.city"
            ]);
    
        console.log(count);
        response.header("X-Total-Count", count['count(*)']);
        response.json(incidents);
    },


    async delete(request, response){
        const ong_id = request.headers.authorization;
        const incidentId = request.params.id;

        const incident = await connection("incidents")
                    .where("id", incidentId)
                    .select("ong_id")
                    .first();

        console.log(incident);
        if(incident == undefined || (incident.ong_id != ong_id))
        {
            return response.status(401).json({error:"Operation not permitted"});
        }

        await connection("incidents").where("id", incidentId).delete();

        return response.status(204).send();
    }
};