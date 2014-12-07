(function(){  
  
  var emptyStar = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGcgaWQ9Imljb21vb24taWdub3JlIj48bGluZSBzdHJva2Utd2lkdGg9IjEiIHgxPSIiIHkxPSIiIHgyPSIiIHkyPSIiIHN0cm9rZT0iIzQ0OUZEQiIgb3BhY2l0eT0iIj48L2xpbmU+PC9nPjxwYXRoIGQ9Ik0zMiAxMi40MDhsLTExLjA1Ni0xLjYwNy00Ljk0NC0xMC4wMTgtNC45NDQgMTAuMDE4LTExLjA1NiAxLjYwNyA4IDcuNzk4LTEuODg5IDExLjAxMSA5Ljg4OS01LjE5OSA5Ljg4OSA1LjE5OS0xLjg4OS0xMS4wMTEgOC03Ljc5OHpNMTYgMjMuNTQ3bC02Ljk4MyAzLjY3MSAxLjMzNC03Ljc3Ni01LjY1LTUuNTA3IDcuODA4LTEuMTM0IDMuNDkyLTcuMDc1IDMuNDkyIDcuMDc1IDcuODA3IDEuMTM0LTUuNjUgNS41MDcgMS4zMzQgNy43NzYtNi45ODMtMy42NzF6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMyI+PC9wYXRoPjwvc3ZnPg==';
  var fullStar = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGcgaWQ9Imljb21vb24taWdub3JlIj48bGluZSBzdHJva2Utd2lkdGg9IjEiIHgxPSIiIHkxPSIiIHgyPSIiIHkyPSIiIHN0cm9rZT0iIzQ0OUZEQiIgb3BhY2l0eT0iIj48L2xpbmU+PC9nPjxwYXRoIGQ9Ik0zMiAxMi40MDhsLTExLjA1Ni0xLjYwNy00Ljk0NC0xMC4wMTgtNC45NDQgMTAuMDE4LTExLjA1NiAxLjYwNyA4IDcuNzk4LTEuODg5IDExLjAxMSA5Ljg4OS01LjE5OSA5Ljg4OSA1LjE5OS0xLjg4OS0xMS4wMTEgOC03Ljc5OHoiIGZpbGw9IiNGRUE1MDEiPjwvcGF0aD48L3N2Zz4=';
  
  function setBackground(node, layer, content){
    var html = '',
        items = node.items || 5,
        width = 100 / items,
        content = content ? content : layer == node.xtag.emptyLayer ? emptyStar : fullStar;
    while (items--) html += '<img class="x-rating-item" style="width: ' + width + '%" src="' + content + '"/>';
    layer.innerHTML = html;
  }
  
  function setWidth(node, value){
    var step = node.step;
    node.setAttribute('display-value', step ? node.items * ((value / step) / (100 / step)) : value);
    node.xtag.fullLayer.style.width = value + '%';
    node.xtag.fullInner.style.width = (100 / value) * 100 + '%';
  }
  
  xtag.register('x-rating', {
    content: '<div>' +
               '<div class="x-rating-layers">' +
                 '<div class="x-rating-empty-layer"></div>' +
                 '<div class="x-rating-full-layer"><div></div></div>' + 
                 '<input type="range" class="x-rating-range" />' +
               '</div>' +
             '</div>',
    lifecycle: {
      created: function() {
        this.xtag.range = this.querySelector('.x-rating-range');
        this.xtag.fullLayer = this.querySelector('.x-rating-full-layer');
        this.xtag.fullInner = this.xtag.fullLayer.firstChild;
        this.xtag.emptyLayer = this.querySelector('.x-rating-empty-layer');
        if (!this.items) this.items = 5;
        setWidth(this, this.value);
      }
    },
    events: { 
      input: function(e){
        setWidth(this, e.target.value);
      },
      change: function(e){
        this.value = e.target.value;
        setWidth(this, e.target.value);
      }
    },
    accessors: {
      fullBackground: {
        attribute: {},
        set: function(val){
          setBackground(this, this.xtag.fullInner, val);
        }
      },
      emptyBackground: {
        attribute: {},
        set: function(val){
          setBackground(this, this.xtag.emptyLayer, val);
        }
      },
      items: {
        attribute: {},
        set: function(){
          setBackground(this, this.xtag.fullInner, this.fullBackground);
          setBackground(this, this.xtag.emptyLayer, this.emptyBackground);
          if (this.step) this.xtag.range.style.left = '-' + (this.xtag.range.style.paddingRight = this.step / 2 + '%');
        }
      },
      name: {
        attribute: { property: 'range' }
      },
      value: {
        attribute: { property: 'range' }
      },
      value: {
        attribute: { property: 'range' }
      },
      step: {
        attribute: { property: 'range' }
      },
      disabled: {
        attribute: {
          boolean: true,
          property: 'range'
        }
      }
    }
  });

})();
