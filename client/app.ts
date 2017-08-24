//window.onload = () => {
    var game = new Kodo.Game();


var WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () {  },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Baloo Paaji']
    }

};
//};