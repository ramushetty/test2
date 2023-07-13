const {pool} = require("../database")

 const initializeRoles = async () => {
    try {
        const client = await pool.connect();
        
        // Define the SQL statements
        const sqlStatements = [
          "INSERT INTO roles (name, description) VALUES ('admin', 'Administrator role with full access')",
          "INSERT INTO roles (name, description) VALUES ('individual', 'Regular user role')",
          "INSERT INTO roles (name, description) VALUES ('bank', 'Bank role with specific permissions')",
          "INSERT INTO roles (name, description) VALUES ('RBI', 'RBI role with specific permissions')",
          "INSERT INTO roles (name, description) VALUES ('merchant', 'merchant role with specific permissions')",
        ];
    
        // Execute the SQL statements
        for (const sqlStatement of sqlStatements) {
          await client.query(sqlStatement);
        }
    
        client.release();
        console.log('Default roles created successfully.')
      } catch (error) {
        console.error('Error creating default roles:', error);
        
      }
}

module.exports = {initializeRoles}