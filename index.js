var _ = require('lodash')
    , assert = require('assert')
    , validCategories = ['bar', 'coffee', 'food']
;
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var msg = step.input('text').first() || ''
            , zip, requestedCategory
            , self = this
        ;
        zip = msg.replace(/.*?([\d]*)$/, '$1');
        if(!zip) {
            zip = step.input('zipcode').first();
        }
        requestedCategory = msg.replace(zip, '').trim().toLowerCase();
        if(requestedCategory) {
            if(_.indexOf(validCategories, requestedCategory) === false) {
                this.fail(new Error('No such requestedCategory'));
            }
            this.complete(_.map(this.getCategories(requestedCategory), function(category) {
                return { zipcode: zip, categories: category.trim() };
            }));
        } else {
            categories = _.union.apply(_, _.map(validCategories, function(validCategory) {
                return self.getCategories(validCategory);
            }));
            this.complete({ zipcode: zip, categories: categories });
        }
    }
    , getCategories: function(input) {
        switch(input) {
            case 'bar':
                return ['Piano Bar', 'Bar', 'Beach Bar', 'Beer Bar', 'Beer Garden',
                    'Champagne Bar', 'Cocktail Bar', 'Dive Bar', 'Gay Bar', 'Hookah Bar',
                    'Hotel Bar', 'Karaoke Bar', 'Pub', 'Sake Bar', 'Sports Bar', 'Tiki Bar',
                    'Whiskey Bar', 'Wine Bar', 'Brewery', 'Lounge', 'Speakeasy'];
                break;
            case 'food':
                return ['Food', "Afghan Restaurant","African Restaurant","Ethiopian Restaurant",
                    "American Restaurant","New American Restaurant","Asian Restaurant","Burmese Restaurant",
                    "Cambodian Restaurant","Chinese Restaurant","Anhui Restaurant","Beijing Restaurant",
                    "Cantonese Restaurant","Chinese Aristocrat Restaurant","Dim Sum Restaurant",
                    "Dongbei Restaurant","Fujian Restaurant","Guizhou Restaurant","Hainan Restaurant",
                    "Hakka Restaurant","Henan Restaurant","Hong Kong Restaurant","Huaiyang Restaurant",
                    "Hubei Restaurant","Hunan Restaurant","Imperial Restaurant","Jiangsu Restaurant",
                    "Jiangxi Restaurant","Macanese Restaurant","Manchu Restaurant","Peking Duck Restaurant",
                    "Shaanxi Restaurant","Shandong Restaurant","Shanghai Restaurant","Shanxi Restaurant",
                    "Szechuan Restaurant","Taiwanese Restaurant","Tianjin Restaurant","Xinjiang Restaurant",
                    "Yunnan Restaurant","Zhejiang Restaurant","Filipino Restaurant","Himalayan Restaurant",
                    "Hotpot Restaurant","Indonesian Restaurant","Acehnese Restaurant","Balinese Restaurant",
                    "Betawinese Restaurant","Javanese Restaurant","Manadonese Restaurant","Padangnese Restaurant",
                    "Sundanese Restaurant","Japanese Restaurant","Donburi Restaurant","Japanese Curry Restaurant",
                    "Kaiseki Restaurant","Kushikatsu Restaurant","Monjayaki Restaurant","Nabe Restaurant",
                    "Okonomiyaki Restaurant","Ramen Restaurant","Shabu-Shabu Restaurant","Soba Restaurant",
                    "Sukiyaki Restaurant","Sushi Restaurant","Tempura Restaurant","Tonkatsu Restaurant",
                    "Udon Restaurant","Unagi Restaurant","Yakitori Restaurant","Yoshoku Restaurant",
                    "Korean Restaurant","Bossam/Jokbal Restaurant","Bunsik Restaurant","Gukbap Restaurant",
                    "Janguh Restaurant","Samgyetang Restaurant","Malaysian Restaurant","Mongolian Restaurant",
                    "Satay Restaurant","Thai Restaurant","Som Tum Restaurant","Tibetan Restaurant",
                    "Vietnamese Restaurant","Australian Restaurant","Austrian Restaurant","Belgian Restaurant",
                    "Brazilian Restaurant","Baiano Restaurant","Central Brazilian Restaurant",
                    "Goiano Restaurant","Mineiro Restaurant","Northeastern Brazilian Restaurant",
                    "Northern Brazilian Restaurant","Southeastern Brazilian Restaurant",
                    "Southern Brazilian Restaurant","Cajun / Creole Restaurant","Caribbean Restaurant",
                    "Caucasian Restaurant","Comfort Food Restaurant","Czech Restaurant","Dumpling Restaurant",
                    "Eastern European Restaurant","Belarusian Restaurant","Bulgarian Restaurant",
                    "Romanian Restaurant","Tatar Restaurant","English Restaurant","Falafel Restaurant",
                    "Fast Food Restaurant","Fondue Restaurant","French Restaurant","German Restaurant",
                    "Bavarian Restaurant","Franconian Restaurant","German Pop-Up Restaurant",
                    "Palatine Restaurant","Rhenisch Restaurant","Schnitzel Restaurant","Silesian Restaurant",
                    "Swabian Restaurant","Gluten-free Restaurant","Greek Restaurant","Cretan Restaurant",
                    "Grilled Meat Restaurant","Meze Restaurant","Modern Greek Restaurant","Patsa Restaurant",
                    "Tsipouro Restaurant","Halal Restaurant","Hawaiian Restaurant","Hungarian Restaurant",
                    "Indian Restaurant","Andhra Restaurant","Awadhi Restaurant","Bengali Restaurant",
                    "Chettinad Restaurant","Goan Restaurant","Gujarati Restaurant","Hyderabadi Restaurant",
                    "Indian Chinese Restaurant","Jain Restaurant","Karnataka Restaurant","Kerala Restaurant",
                    "Maharashtrian Restaurant","Mughlai Restaurant","Multicuisine Indian Restaurant",
                    "North Indian Restaurant","Northeast Indian Restaurant","Parsi Restaurant",
                    "Punjabi Restaurant","Rajasthani Restaurant","South Indian Restaurant","Udupi Restaurant",
                    "Italian Restaurant","Abruzzo Restaurant","Aosta Restaurant","Basilicata Restaurant",
                    "Calabria Restaurant","Campanian Restaurant","Emilia Restaurant","Friuli Restaurant",
                    "Ligurian Restaurant","Lombard Restaurant","Marche Restaurant","Molise Restaurant",
                    "Piedmontese Restaurant","Puglia Restaurant","Romagna Restaurant","Roman Restaurant",
                    "Sardinian Restaurant","Sicilian Restaurant","South Tyrolean Restaurant","Trentino Restaurant",
                    "Tuscan Restaurant","Umbrian Restaurant","Veneto Restaurant","Jewish Restaurant",
                    "Kosher Restaurant","Latin American Restaurant","Arepa Restaurant","Cuban Restaurant",
                    "Empanada Restaurant","Mediterranean Restaurant","Moroccan Restaurant","Mexican Restaurant",
                    "Tex-Mex Restaurant","Middle Eastern Restaurant","Israeli Restaurant","Persian Restaurant",
                    "Modern European Restaurant","Molecular Gastronomy Restaurant","Pakistani Restaurant",
                    "Polish Restaurant","Portuguese Restaurant","Russian Restaurant","Scandinavian Restaurant",
                    "Seafood Restaurant","Slovak Restaurant","South American Restaurant","Argentinian Restaurant",
                    "Peruvian Restaurant","Venezuelan Restaurant","Southern / Soul Food Restaurant","Spanish Restaurant",
                    "Paella Restaurant","Tapas Restaurant","Sri Lankan Restaurant","Swiss Restaurant","Theme Restaurant",
                    "Turkish Restaurant","Doner Restaurant","Kebab Restaurant","Kokoreç Restaurant",
                    "Kumpir Restaurant","Kumru Restaurant","Tantuni Restaurant","Turkish Home Cooking Restaurant",
                    "Ukrainian Restaurant","Varenyky restaurant","West-Ukrainian Restaurant","Vegetarian / Vegan Restaurant",
                    "Breakfast Spot", "Buffet", "Burger Join", "Cafeteria", "Takoyaki Place", "Wagashi Place",
                    "Noodle House", "BBQ Joint", "Bagel Shop", "Bistro", "Acai House", "Churrascaria",
                    "Empada House", "Pastelaria", "Creperie", "Diner", "Fish & Chips Shop", "Food Stand",
                    "Food Truck", "Fried Chicken Joint", "Friterie", "Gastropub", "Bratwurst Join",
                    "Currywurst Joint", "Fish Taverna", "Grilled Meat Restaurant", "Hot Dog Joint",
                    "Dhaba", "Dosa Place", "Irish Pub", "Mac & Cheese Joint", "Burrito Place", "Taco Place",
                    "Pizza Place", "Poutine Place", "Blini House", "Pelmeni House", "Salad Place",
                    "Sandwich Place", "Snack Place", "Soup Place", "Steakhouse", "Wings Joint"
                ];
                break;
            case 'coffee':
                return ['Coffee Shop', 'Turkish Coffeehouse', 'Diner', 'Café', "Bagel Shop", "Bakery", "Kafenio"]
                break;
            default:
                return [];
                break;
        }

    }
};
