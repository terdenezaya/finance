// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container"
    };

 return {
    getInput: function(){
        return {
            type: document.querySelector(DOMstrings.inputType).value, // exp, inp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)          
        };
    },

    getDOMstrings: function() {
        return DOMstrings;
    },

    clearFields: function() {
        var fields = document.querySelectorAll(
            DOMstrings.inputDescription + "," + DOMstrings.inputValue
        );

        // convert List to Array
        var fieldsArr = Array.prototype.slice.call(fields);
        
        fieldsArr.forEach(function(el, index, array) {
            el.value = "";
        });

        fieldsArr[0].focus();
    },

    tusviigUzuuleh: function(tusuv) {
        document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
        document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;
       
        
        if (tusuv.huvi !== 0) {
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
        } else {
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
        }
    },

    deleteListItem: function(id) {
        var el = document.getElementById(id);
        el.parentNode.removeChild(el);

    },

    addListItem: function(item, type) {
        // Orlogo zarlagiin elementiig aguulsan html ii g beltgene
        var html, list;
        if(type === 'inc') {
            list = DOMstrings.incomeList;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUe$$</div><div class="item__delete">    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>   </div></div>';
        } else { 
            list = DOMstrings.expenseList;
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>    <div class="right clearfix"><div class="item__value">$$VALUe$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">    <i class="ion-ios-close-outline"></i></button></div></div></div>';

        }

        // HTML dotroo orlogo zarlagiig Replace ashiglaj uurchluh
        html = html.replace("%id%", item.id);
        html = html.replace("$$DESCRIPTION$$", item.description);
        html = html.replace("$$VALUe$$", item.value);
        
        // Beltgessen HTML ee DOM ruu hiij ugnu
        document.querySelector(list).insertAdjacentHTML('beforeend', html);

    }
 };
})();
// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    // private data
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      };

      // private data
      var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      };

      var calculateTotal = function(type){
        var sum = 0;
        data.items[type].forEach(function(el) {
            sum = sum + el.value; 
        });

        data.totals[type] = sum;
      };

      // private data
    //   var incomes = [];
    //   var expenses = [];
      
      var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },

        tusuv: 0,

        huvi: 0
      };

      return {
        tusuvTooshoh: function() {
            // Niit orlogiig tootsooloh.
            calculateTotal('inc');
            
            // Niit zarlagiig tootsooloh.
            calculateTotal('exp');

            // tusviig shineer tootsoolno.
            data.tusuv = data.totals.inc - data.totals.exp;

            // Orlogo zarlagiin huviig tootsoolno.
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);

        },

        tusuviigAvah: function(){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            };
        },

        deleteItem: function(type, id) {
            var ids = data.items[type].map(function(el) {
                return el.id;
            });

            var index = ids.indexOf(id);

            if(index !== -1) {
                data.items[type].splice(index, 1);
            }
        },

        addItem: function(type, desc, val) {
            var item, id;

            if (data.items[type].length === 0) id = 1; 
            else {
                data.items[type][data.items[type].length - 1].id + 1;
            }

            if (type === 'inc'){
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);
            return item;
        },

        seeData: function() {
            return data;

        }
      };   
})();

// Програмын холбогч ажиллах контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
         // 1. Оруулах өгөгдлийг олж авна.        
        var input = uiController.getInput();
        
        if(input.description !== "" && input.value !== "") {
        // 2. Олж авсан өгөгдлөө санхүүгийн контроллерт дамжуулж тэнд хадгална.
          var item = financeController.addItem(
            input.type, 
            input.description, 
            input.value
            );
         
         // 3. Олж авсан өгөгдлүүдийг веб дээрээ тохирох хэсэгт гаргана. 
         uiController.addListItem(item, input.type);
         uiController.clearFields();
        //  Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.
         updateTusuv(); 
        } 
    };

    var updateTusuv = function() {
        // 4. Төсвийг тооцоолно. 
        financeController.tusuvTooshoh();

        // 5. Эцсийн үлдэгдэл тооцоод дэлгэцэнд гаргана.
        var tusuv = financeController.tusuviigAvah();

        //  6.Tusuviin tootsoog Delgetsend gargana.
        uiController.tusviigUzuuleh(tusuv); 

};
              
 var setupEventListeners = function() {    
    var DOM = uiController.getDOMstrings();
    
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
        ctrlAddItem();       
    });

    document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }                
    });

    document.querySelector(DOM.containerDiv).addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(id) {
            var arr = id.split("-");
            var type = arr[0];
            var itemId = parseInt(arr[1]);

            console.log(type + '===> ' + itemId);

            // 1.Санхүүгийн модулиас type, id ашиглаад устгана.
            financeController.deleteItem(type, itemId);

            // 2.Дэлгэц дээрээс энэ элементийг устгана.
            uiController.deleteListItem(id);

            // 3. Үлдэгдэл тооцоог шинэчилж харуулна.
            //  Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ.
            updateTusuv(); 
        }  

    });
 };

 return {
    init: function() {
        console.log('Application started...');
        uiController.tusviigUzuuleh({
            tusuv: 0,
            huvi: 0,
            totalExp: 0,
            totalInc: 0
        });
        setupEventListeners();
     }
 };
    
})(uiController, financeController);

appController.init();