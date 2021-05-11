function getAllCSS(element){    
    if( !element instanceof HTMLElement ){
        console.warn("Select a valid HTML Element before proceeding");
        return '';
    }

    let cssString = '';
    const cssObj = window.getComputedStyle(element);

    let cssAttributes = [];

    let elementSelector = '';

    let cssClasses = Array.from(element.classList).filter( c => { return -1 === c.indexOf('ng') });
    if( cssClasses.length > 0 ){
       elementSelector = "." + cssClasses.join(".");
    }else{
        elementSelector = element.id || `[data-tag=${element.tagName.toLowerCase()}]`;
    }

    cssString += `${elementSelector}  {\n`;

    Object.keys(cssObj).forEach( key => {
        if( isNaN(key) ){
            return;
        }

        cssAttributes.push(cssObj[key]);
    });


    cssAttributes.forEach( attr => {       
        let _cssString = attr+":"+window.getComputedStyle(element).getPropertyValue(attr)+";"
        cssString += _cssString +'\n';
    });

    cssString += `}`;
    return cssString;

}

var css = '';

var parentElement = $0;

var allElements = Array.from(parentElement.querySelectorAll("*"));
allElements.push(parentElement);


allElements.forEach( el => {
    css += getAllCSS( el );
});

console.info(css);
