import { Component, OnInit , OnChanges, SimpleChanges, Input,DoCheck} from '@angular/core';
@Component({
  selector: 'app-g-canvas',
  templateUrl: './g-canvas.component.html',
  styleUrls: ['./g-canvas.component.css']
})
export class GCanvasComponent implements DoCheck {
  ngDoCheck() {
    // ...
    if(this.m!=this.oldm || this.n!=this.oldn || this.pos!= this.oldpos){
      if(this.m<3){
        this.m = 3;
      }
      if(this.n<3){
        this.n = 3;
      }
      // console.log(this.m,this.n,this.oldm,this.oldn);
      this.img = new Image();
      this.loadImageExecuted = false;
      this.width=0;
      this.height=0;
      this.imgArray = [];
      this.positions = [];
      this.cstyle = [];
      this.solved = false;
      this.tstyle=[];
      this.img.src = this.imgaddr[this.pos];
      this.img.onload = this.imageloaded.bind(this);
      this.width = this.img.width;
      this.height = this.img.height;
      this.positions = [];
      for(var j =0;j<this.m*this.n;j++){
        this.positions.push(j);
      }
      this.oldm =this.m;
      this.oldn = this.n;
      this.oldpos = this.pos;


      //console.log(this.m,this.n,this.oldm,this.oldn);
    }
  }
  img = new Image();
  loadImageExecuted = false;
  // shuffled = true;
  width=0;
  height=0;
  m=3;n=3;
  oldm =3;oldn=3;
  imgArray = [];
  positions = [];
  cstyle = [];
  solved = false;
  tstyle=[];
  pos =0;
  oldpos=0;
  cpos= 0;
  pic = true;
  imgaddr = [
    './assets/angular.png',
    './assets/cassiecage.jpg',
    './assets/liukang.jpg',
    './assets/kunglao.jpg',
    './assets/kitana.jpg',
    './assets/scorpion.jpg',
    './assets/subzero.jpg',
    './assets/meelina.jpg',
    './assets/jade.jpg',
    './assets/trio.jpg'
  ];
  oiaddr = [];

  tbl = [0,0,0,0,0,0,0,0,0,0];
  grid = [[3,3],[3,3],[3,3],[3,3],[4,3],[4,3],[4,3],[3,4],[3,4],[4,4]];

  lst = {
    'tbl':this.tbl,
    'grid':this.grid
  }



  constructor() {
    // localStorage.removeItem("slidepuzz");
      console.log(this.pic);

      this.closeview();
    if(localStorage.getItem("slidepuzz")==null || typeof(localStorage.getItem("slidepuzz")) == 'undefined'){
      //console.log("not present");
      localStorage.setItem("slidepuzz", JSON.stringify(this.lst));

      console.log(this.oiaddr);
    }else{
      this.lst = JSON.parse(localStorage.getItem("slidepuzz"));
      this.tbl = this.lst.tbl;
      this.grid = this.lst.grid;




      for(var t =0;t<this.tbl.length;t++){

        if(this.tbl[t] == 0){
          this.pos = t;
          break;
        }
        this.oiaddr[t] = this.imgaddr[t];
      }
      this.m = (this.lst.grid[this.pos])[0];
      this.n = (this.lst.grid[this.pos])[1];
    }

    //console.log(this.lst);


    this.img.src = this.imgaddr[this.pos];
    this.img.onload = this.imageloaded.bind(this);
    this.width = this.img.width;
    this.height = this.img.height;
    // this.shuffled = false;
    for(var j =0;j<this.m*this.n;j++){
      this.positions.push(j);
    }




  }


  imageloaded = function(){
    this.loadImage();
    setTimeout(() => {
      this.shuffle();
    }, 0);
  }

  loadImage = function(){
    if(!this.loadImageExecuted){
      var im = this.img;
      this.width = im.width;
      this.height = im.height;
      var m = this.m,n = this.n;
      //console.log(this.width ,this.height ,m,n);
      for(var y = 0; y < m; y++) {
          for(var x = 0; x < n; x++) {

              var canvas = document.createElement('canvas');
              canvas.width = this.width/n;
              canvas.height = this.height/m;
              //console.log(canvas.width ,canvas.height);
              if(x==n-1 && y == m-1){
                this.imgArray.push("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMa27+DwAFUAJ1KEVFmgAAAABJRU5ErkJggg==");
              }else{
                var context = canvas.getContext('2d');
                context.drawImage(im, x * canvas.width, y * canvas.height, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                this.imgArray.push(canvas.toDataURL());
              }
              // //console.log(canvas.toDataURL());
          }
      }

      this.loadStyle();//console.log(this.tstyle);
      this.loadImageExecuted = true;
    }
  }

  loadStyle(){
    for(var i =0;i<this.m;i++){
      for(var j =0;j<this.n;j++){
          this.cstyle[i*this.n+j] = {
            'top':(i*this.height/this.m)+'px',
            'left':(j*this.width/this.n)+'px',
          }

          this.tstyle[i*this.n+j] ={
            'width':this.width/this.n+'px',
            'height':this.height/this.m+'px',
            'background-image':'url('+this.imgArray[i*this.n+j]+')',

          };

      }
    }

    // //console.log(this.tstyle);
    // if(!this.shuffled){
    //   this.shuffle();
    //   this.shuffled = true;
    // }
  }

  clicked(h,po){
    // //console.log(this.positions);

    var m = this.m;
    var n = this.n;
    var indexh = this.positions.findIndex(x => x==m*n-1);
    //console.log(indexh,h,m,n);





    if(this.positions[h] >= m*n-1){


    }else{


      if(Math.abs(indexh-h)==1){
          if(indexh > h && ((h+1)%n == 0)){
            //dont move right

          }else if(indexh < h  && ((h)%n == 0)){
            //dont move left

          }else{
            var temp = this.imgArray[h];
            this.imgArray[h] = this.imgArray[indexh];
            this.imgArray[indexh] = temp;
            temp = this.positions[h];
            this.positions[h] = this.positions[indexh];
            this.positions[indexh] = temp;
          }
      }else if(Math.abs(indexh-h)==n ){
        //console.log('entered');
        if(indexh < h && (h<n)){
          //dont move up

        }else if(indexh > h  && (h>n*(m-1)-1)){
          //dont move down

        }else{
          var temp = this.imgArray[h];
          this.imgArray[h] = this.imgArray[indexh];
          this.imgArray[indexh] = temp;
          temp = this.positions[h];
          this.positions[h] = this.positions[indexh];
          this.positions[indexh] = temp;
        }
      }
    }

    var counter = 0;
    for(var p =0;p<m*n-1;p++){
      if(this.positions[p] != p){
        counter++;
      }
    }

    if(counter == 0 && po == 1){
      this.solved = true;
      var canvas = document.createElement('canvas');
      canvas.width = this.width/n;
      canvas.height = this.height/m;
      var context = canvas.getContext('2d');
      context.drawImage(this.img, (n-1) * canvas.width, (m-1) * canvas.height, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

      this.imgArray[m*n-1] = canvas.toDataURL();


    }else{
      this.solved = false;
    }
    this.loadStyle();
  }


  shuffle(){
    for (var a = 0;a<150*Math.max(this.n,this.m);a++){
      var x = Math.floor((Math.random() * (this.m*this.n-1)));
      this.clicked(x,0);
    }

  }

  showpic(){
    this.pic = true;
  }
  showlpic(i){
    this.cpos = i;
    this.pic = true;
  }

  closeview(){
    this.pic = false;
  }

  solve(){
    this.pos++;
    this.cpos = this.pos-1;
    this.oiaddr[this.pos-1] = this.imgaddr[this.pos-1];
    for(var e =0;e<this.imgaddr.length;e++){
      if(this.pos == e){
        break;
      }
      this.tbl[e] = 1;
      this.lst.tbl = this.tbl;
      localStorage.setItem("slidepuzz", JSON.stringify(this.lst));
      this.tbl = this.lst.tbl;
      this.grid = this.lst.grid;
      if(this.pos < this.imgaddr.length){
        this.m = (this.lst.grid[this.pos])[0];
        this.n = (this.lst.grid[this.pos])[1];
      }
    }
    this.showpic();
  }

  reset(){
    localStorage.removeItem("slidepuzz");
     window.location.reload();

  }



}
