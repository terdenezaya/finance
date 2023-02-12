// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){

})();
// Санхүүтэй ажиллах контроллер
var financeController = (function(){

})();
// Програмын холбогч ажиллах контроллер
var appController = (function(uiController, fnController){
    var ctrlAddItem = function(){
         // 1. Оруулах өгөгдлийг олж авна.
         console.log('Delgetsees ugugdul avah heseg');
         // 2. Олж авсан өгөгдлөө санхүүгийн контроллерт дамжуулж тэнд хадгална.
         // 3. Олж авсан өгөгдлүүдийг веб дээрээ тохирох хэсэгт гаргана. 
         // 4. Төсвийг тооцоолно. 
         // 5. Эцсийн үлдэгдэл тооцоод дэлгэцэнд гаргана.
    };

    document.querySelector(".add__btn").addEventListener("click", function(){
        ctrlAddItem();
       
    });

    document.addEventListener("keypress", function(event){
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }                
    });
})(uiController, financeController);