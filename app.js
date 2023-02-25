// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }
 return {
    getInput: function(){
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
            
        }
    },
    getDOMstrings: function() {
        return DOMstrings;
    }
 }
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function(){
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      };
      
      var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      };
      
      var incomes = [];
      var expenses = [];
      
      incomes.push(i1);
      incomes.push(i2);
      console.log(incomes[1].value);

      var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
      }

      data.allItems.inc.push(i1);
      console.log(data.totals.inc)

      

})();
// Програмын холбогч ажиллах контроллер
var appController = (function(uiController, fnController){

    var ctrlAddItem = function(){
         // 1. Оруулах өгөгдлийг олж авна.
         console.log(uiController.getInput());
         // 2. Олж авсан өгөгдлөө санхүүгийн контроллерт дамжуулж тэнд хадгална.
         // 3. Олж авсан өгөгдлүүдийг веб дээрээ тохирох хэсэгт гаргана. 
         // 4. Төсвийг тооцоолно. 
         // 5. Эцсийн үлдэгдэл тооцоод дэлгэцэнд гаргана.
    };

 var setupEventListeners = function() {
    
    var DOM = uiController.getDOMstrings();
    
    document.querySelector(DOM.addBtn).addEventListener("click", function(){
        ctrlAddItem();
       
    });

    document.addEventListener("keypress", function(event){
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }                
    });
 };

 return {
    init: function() {
        console.log('Application started...');
        setupEventListeners();
     }
 };
    
})(uiController, financeController);

appController.init();