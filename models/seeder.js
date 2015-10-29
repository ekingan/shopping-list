var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/shopping-list', function() {
    
    // Load Mongoose models 
    seeder.loadModels([
        'items.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['Item'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data);
 
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
     {name: 'kale'}, {name: 'red peppers'}, {name: 'tahini'}
        
];  
 