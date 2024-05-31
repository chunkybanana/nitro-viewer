let season = 1, partNum = 1, chapter = 1, comic = 1, images = [];

const ppSeason = document.getElementById("ppSeason"), pSeason = document.getElementById("pSeason"), nSeason = document.getElementById("nSeason"), nnSeason = document.getElementById("nnSeason");
const ppPart = document.getElementById("ppPart"), pPart = document.getElementById("pPart"), nPart = document.getElementById("nPart"), nnPart = document.getElementById("nnPart");
const ppChapter = document.getElementById("ppChapter"), pChapter = document.getElementById("pChapter"), nChapter = document.getElementById("nChapter"), nnChapter = document.getElementById("nnChapter");
const ppComic = document.getElementById("ppComic"), pComic = document.getElementById("pComic"), nComic = document.getElementById("nComic"), nnComic = document.getElementById("nnComic");

function loadComic(){
    location.hash = `${season == 1 ? "" : "s" + season + "-"}${partNum}-${chapter}-${comic}`;
    let comicImg = document.getElementById('comicimg');
    comicImg.src = `comics/s{season}/p${partNum}/c${chapter}/${comic}.png`;
    comicImg.title = parts[season - 1][partNum - 1][chapter - 1][comic - 1];
    document.getElementById('season').innerText = season + " / " + parts.length;
    document.getElementById('part').innerText = partNum + " / " + parts[season - 1].length;
    document.getElementById('chapter').innerText = chapter + " / " + parts[season - 1][partNum - 1].length;
    document.getElementById('comicnum').innerText = comic + " / " + parts[season - 1][partNum - 1][chapter - 1].length;
    
    preloadImage(season, partNum, chapter, comic + 1);
    preloadImage(season, partNum, chapter, comic + 2);
    preloadImage(season, partNum, chapter, comic + 3);
    preloadImage(season, partNum, chapter, comic - 1);
    preloadImage(season, partNum, chapter, comic - 2);
    preloadImage(season, partNum, chapter + 1, 1);
    preloadImage(season, partNum, chapter + 2, 1);
    preloadImage(season, partNum, chapter - 1, 1);
    preloadImage(season, partNum, chapter - 2, 1);
    preloadImage(season, partNum, chapter + 1, 2);
    preloadImage(season, partNum, chapter + 1, 3);

    preloadImage(1, 1, 1, 1);
    preloadImage(1, 2, 1, 1);
    
    pSeason.disabled = season == 1;
    nSeason.disabled = season == parts.length;
    pPart.disabled = partNum == 1;
    nPart.disabled = partNum == parts[season - 1].length;
    pChapter.disabled = chapter == 1 && partNum == 1;
    nChapter.disabled = chapter == parts[season - 1][partNum - 1].length && partNum == parts[season - 1].length;
    pComic.disabled = comic == 1 && chapter == 1 && partNum == 1;
    nComic.disabled = comic == parts[season - 1][partNum - 1][chapter - 1].length && chapter == parts[season - 1][partNum - 1].length && partNum == parts[season - 1].length;
    
    let titleText = document.getElementById("title");
    
    titleText.textContent = parts[season - 1][partNum - 1][chapter - 1][comic - 1];
}
function preloadImage(season, part, chapter, comic){
    if(season <= 0 || season > parts.length || part <= 0 || part > parts[season - 1].length || chapter <= 0 || chapter > parts[season - 1][part - 1].length || comic <= 0 || comic > parts[season - 1][part - 1]?.[chapter - 1]?.length) return;
    let url = `comics/s${season}/p${part}/c${chapter}/${comic}.png`;
    if(!images.find(value => value.src == 'https://se-nitro.surge.sh/' + url)){
        let img = new Image();
        img.src = url;
        images.push(img)
    }
}
window.addEventListener('load', _ => {
    let hash = location.hash.slice(1).split('-');
    if (hash[0][0] == "s") {
        season = parseInt(hash.shift().slice(1)) || 1;
    }
    partNum = parseInt(hash[0]) || 1;
    chapter = parseInt(hash[1]) || 1;
    comic = parseInt(hash[2]) || 1;
    loadComic();
});

ppSeason.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum = 1;
    season = 1;
    
    loadComic();
}, false);
pSeason.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum = 1;
    season -= 1;
    
    loadComic();
}, false);
nSeason.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum = 1;
    season += 1;
    
    loadComic();
}, false);
nnSeason.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum = 1;
    season = parts.length;
    
    loadComic();
}, false);

ppPart.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum = 1;
    
    loadComic();
}, false);
pPart.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum -= 1;
    
    loadComic();
}, false);
nPart.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum += 1;
    
    loadComic();
}, false);
nnPart.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    partNum = parts[season - 1].length;
    
    loadComic();
}, false);

ppChapter.addEventListener("click", () => {
    comic = 1;
    chapter = 1;
    
    loadComic();
}, false);
pChapter.addEventListener("click", () => {
    comic = 1;
    chapter -= 1;
    
    if (chapter == 0) {
        partNum -= 1;
        chapter = parts[season - 1][partNum - 1].length;
    }
    
    loadComic();
}, false);
nChapter.addEventListener("click", () => {
    comic = 1;
    chapter += 1;
    
    if (chapter > parts[season - 1][partNum - 1].length) {
        partNum += 1;
        chapter = 1;
    }
    
    loadComic();
}, false);
nnChapter.addEventListener("click", () => {
    comic = 1;
    chapter = parts[season - 1][partNum - 1].length;
    
    loadComic();
}, false);

ppComic.addEventListener("click", () => {
    comic = 1;
    
    loadComic();
}, false);
pComic.addEventListener("click", () => {
    comic -= 1;
    
    if (comic == 0) {
        chapter -= 1;
        
        if (chapter == 0) {
            partNum -= 1;
            chapter = parts[season - 1][partNum - 1].length;
        }
        
        comic = parts[season - 1][partNum - 1][chapter - 1].length;
    }
    
    loadComic();
}, false);
nComic.addEventListener("click", () => {
    comic += 1;
    
    if (comic > parts[season - 1][partNum - 1][chapter - 1].length) {
        chapter += 1;
        
        if (chapter > parts[season - 1][partNum - 1].length) {
            partNum += 1;
            chapter = 1;
        }
        
        comic = 1;
    }
    
    loadComic();
}, false);
nnComic.addEventListener("click", () => {
    comic = parts[season - 1][partNum - 1][chapter - 1].length;
    
    loadComic();
}, false);

window.addEventListener("keydown", (info) => {
    if (info.ctrlKey || info.altKey || info.metaKey || info.shiftKey)
        return;
    
    if (info.code == "ArrowLeft" || info.code == "KeyA" || info.code == "KeyH")
        pComic.click();
    else if (info.code == "ArrowRight" || info.code == "KeyD" || info.code == "KeyL")
        nComic.click();
}, false);
