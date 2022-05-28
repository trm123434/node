
const fs = require('fs');
const express = require("express");
const pretty = require("pretty")
const axios = require("axios");
const cheerio = require("cheerio");
const download = require('download');
const puppeteer = require('puppeteer');

const app = express();

let html = [];
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('https://ojs.unipamplona.edu.co/ojsviceinves/index.php/bistua/article/view/206');
    await page.screenshot({
      path: 'landing-page-1.png',
      fullPage: true
    });
    html = await page.content();
    scrape(html);
    //console.log(html)
  
    browser.close();
  })();



function scrape(html) {

    ///const file = fs.readFileSync('test2.html');
    const $ = cheerio.load(html);
    // console.log(pretty(page.html()))
    
    const titulo = $('h1').text().trim();
    console.log(titulo);
    /// Extracción de los autores
    $('.authors .name').each(function (idx,el) {
        console.log($(el).text().trim());
    });
    
    //// Extracción de la afiliación
    $('.authors .affiliation').each(function (idx,el) {
        console.log($(el).text().trim());
    })
    
    /// Extracción del doi
    const doi = $('.doi .value').text().trim();
    console.log('DOI: ',doi);
    
    /// Extracción de las palabras clave
    const keywords = $('.keywords .value').text().trim();
    console.log('Palabras clave: ',keywords);
    
    /// Extracción del Resumen
    const resumen = $('.abstract p').text().trim();
    console.log('Resumen: ',resumen);
    
    /// Extracción de la cita standard
    const citaStd = $('.csl-right-inline').text().trim();
    console.log('Cita Estandar: ',citaStd)
    
    /// Extracción del link del PDF por medio del atributo href de la etiquta a
    const linkPdf = $('.pdf').attr('href');
    console.log('Link al PDF: ',linkPdf)
    
    /// Extracción del link de la imagen abstract por medio del atributo src de la etiquta img
    const linkImg = $('.cover_image .sub_item img').attr('src');
    console.log('Link a la imagen: ',linkImg)
}