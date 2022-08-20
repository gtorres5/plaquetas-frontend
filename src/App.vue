<template>
  <div>
    <header>
      <nav class="main-nav">
        <input type="checkbox" id="isChecked" v-model="is_checked" />
        <label for="isChecked" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <a href="index.html" class="logo">andraware</a>
        <ul class="navlinks">
          <li><a href="javascript:void(0)">Services</a></li>
          <li><a href="javascript:void(0)">Projects</a></li>
          <li><a href="javascript:void(0)">About</a></li>
          <li>
            <a 
              href="#servicio"
              @click="is_checked = false;"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="py-20 pl-10" id="informacion" style="background-color: #141b25c2; color: aliceblue">
      <h1 class="mb-4" style="font-size: 30px">informacion</h1>
      <div style="padding: 12px;
    margin-right: 12px;
    background-color: #141b255e;
    border: solid;
    border-color: #141b255e;
    border-radius: 12px;">
      esta pagina hace snoawndos ciosdbfiew cobc cviowebfw cowebf weocew ufewov weufweof we9uf we
      cniofwe cweb vwecouew v wevouew uov w ic ewouc eo cuis cse fcowuvfcw
      foe fywe cowe cue ciua icv seiof we
      c erio ciwe cweu cwe <br>
      +rewfg+ér,.g+ér,g´+er,h,+rtongmrenilrenfoen
      <br>
      +rewfg+ér,.g+ér,g´+er,h,+rtongmrenilrenfoen<br>
      +rewfg+ér,.g+ér,g´+er,h,+rtongmrenilrenfoen<br>
      +rewfg+ér,.g+ér,g´+er,h,+rtongmrenilrenfoen<br>
      +rewfg+ér,.g+ér,g´+er,h,+rtongmrenilrenfoen
      </div>
    </div>
    <hr>
    <div class="py-20 pl-10" id="acerca_de" style="background-color: #141b25c2; color: aliceblue">
      <h1 class="mb-4" style="font-size: 30px">acerca de</h1>
      <div>
      esta pagina hace snoawndos ciosdbfiew cobc cviowebfw cowebf weocew ufewov weufweof we9uf we
      cniofwe cweb vwecouew v wevouew uov w ic ewouc eo cuis cse fcowuvfcw
      foe fywe cowe cue ciua icv seiof we
      c erio
      </div>
    </div>
    <hr>
    <div id="servicio" name="servicio" style="background-color: #141b25c2; color: aliceblue">
      <div class="m-5 mt-1 pt-5">
        <h1 class="text-2xl mb-4">Servicio de conteo de plaquetas</h1>
        <div class="mb-4">
          <h1 class="text-2xl mr-2" style="display: inline">campos: {{numero_de_campos}}</h1> 
          <button 
            class="py-1 px-3 bg-green-500 text-white focus:outline-none mx-1"
            style="border-radius: 6px"
            @click="numero_de_campos++"
          >
            +
          </button>
          <button 
            class="py-1 px-3 bg-green-500 text-white focus:outline-none mx-1" 
            style="border-radius: 6px"
            @click="delete_campo" 
            v-if="numero_de_campos > 5"
          >
            -
          </button>
        </div>
        <upload-image 
          v-for="i in numero_de_campos" 
          :key="i" 
          :id="i" 
          :configuraciones="configuraciones"
          :ref="'upload-image-'+i"
          @emitido="add_resultado"
          @brother_image_metadata="SetMetadata"
          @incrementar_campos_con_file="incrementar_campos_con_file"
        >
        </upload-image>
      </div>
      <br>
      <div 
        class="mx-12 px-12 py-4"
        style="font-size: 40px; color: honeydew; background-color: slategrey"
        v-if="conteo_total !== null"
      >
        campos encontrados: {{campos_encontrados}}
        El conteo es: <br>
        {{conteo_total}} plt/mml
      </div>
    </div>
    <div>
      <h1>Configuraciones</h1>
      <label for="chk_busqueda_atomatica"> busqueda atomatica </label>
      <input type="checkbox" id="chk_busqueda_atomatica" v-model="configuraciones.busqueda_automatica">
      <pre>
        {{configuraciones}}
      </pre>
      <br>
    </div>
    <div class="col-md-4">
<div class="col-md-6">
     <h4>Radio Buttons</h4>

    <div class="funkyradio">
        <div class="funkyradio-default">
            <input type="radio" name="radio" id="radio1" />
            <label for="radio1">First Option default</label>
        </div>
        <div class="funkyradio-primary">
            <input type="radio" name="radio" id="radio2" checked/>
            <label for="radio2">Second Option primary</label>
        </div>
        <div class="funkyradio-success">
            <input type="radio" name="radio" id="radio3" />
            <label for="radio3">Third Option success</label>
        </div>
        <div class="funkyradio-danger">
            <input type="radio" name="radio" id="radio4" />
            <label for="radio4">Fourth Option danger</label>
        </div>
        <div class="funkyradio-warning">
            <input type="radio" name="radio" id="radio5" />
            <label for="radio5">Fifth Option warning</label>
        </div>
        <div class="funkyradio-info">
            <input type="radio" name="radio" id="radio6" />
            <label for="radio6">Sixth Option info</label>
        </div>
    </div>
</div>
<div class="col-md-6">
     <h4>Checkbox Buttons</h4>

    <div class="funkyradio">
        <div class="funkyradio-default">
            <input type="checkbox" name="checkbox" id="checkbox1" checked/>
            <label for="checkbox1">First Option default</label>
        </div>
        <div class="funkyradio-primary">
            <input type="checkbox" name="checkbox" id="checkbox2" checked/>
            <label for="checkbox2">Second Option primary</label>
        </div>
        <div class="funkyradio-success">
            <input type="checkbox" name="checkbox" id="checkbox3" checked/>
            <label for="checkbox3">Third Option success</label>
        </div>
        <div class="funkyradio-danger">
            <input type="checkbox" name="checkbox" id="checkbox4" checked/>
            <label for="checkbox4">Fourth Option danger</label>
        </div>
        <div class="funkyradio-warning">
            <input type="checkbox" name="checkbox" id="checkbox5" checked/>
            <label for="checkbox5">Fifth Option warning</label>
        </div>
        <div class="funkyradio-info">
            <input type="checkbox" name="checkbox" id="checkbox6" checked/>
            <label for="checkbox6">Sixth Option info</label>
        </div>
    </div>
</div>
</div>
  </div>
</template>

<script>
import uploadImage from "./components/upload-image.vue";
export default {
  components: { uploadImage },
  data(){
    return{
      is_checked: false,
      resultados: [],
      conteo_total: null,
      numero_de_campos: 10,
      campos_encontrados: 0,
      configuraciones: {
        busqueda_automatica: false,
        habilitar_cambio_cantidad_campos: true,
        seleccion_multiple: true,
        saltar: false,  //cuando existe seleccion multiple, busca los campos libres
        reiniciar_conteo: true,
        habilitar_cambio_campos_subida_multiple: true,
        consultar_cambio_campos_subida_multiple: true, //muestra modal preguntando si desea el aumento de campos
      },
    }
  },
  methods:{
    mover_a(destino){
      document.getElementById(destino).scrollIntoView();
    },
    add_resultado(obj){
      this.resultados[obj.posicion - 1] = obj.resultado;
      this.calcular_conteo_plaquetas();
    },
    SetMetadata(obj){
      this.$refs['upload-image-'+obj.index].putImageMetadata(obj.data);
    },
    delete_campo(){
      this.numero_de_campos--;
      if(this.numero_de_campos === this.resultados.length)
        this.resultados.pop();
      this.calcular_conteo_plaquetas();
    },
    incrementar_campos_con_file(datafile){
      let aumentar = false;
      if(this.configuraciones.consultar_cambio_campos_subida_multiple){
        aumentar = confirm('deseas incrementar los campos?');
      }
      else
        aumentar = true;
      if(aumentar){
        let cantidad_campos = this.numero_de_campos;
        this.numero_de_campos += datafile.files.length;
        setTimeout( async()=>{
          for(let i = 0; i < datafile.files.length; i++){
            cantidad_campos++
            let dataTransfer = new DataTransfer();
            dataTransfer.items.add(datafile.files[i]);
            document.getElementById("file"+cantidad_campos).files = dataTransfer.files; 
            /*this.$refs['upload-image-'+cantidad_campos].putFileSrcOnImage(cantidad_campos).then((resp => {
              const { imgfinal, fileName, typeFile } = resp;
              this.$refs['upload-image-'+cantidad_campos].resizeImage(imgfinal).then((resp2) => {
                let result = resp2.replace(`data:image/png;base64,`, "");
                this.$refs['upload-image-'+cantidad_campos].putImageMetadata({result, fileName, typeFile});
              })
            }));*/
            const data_Result = await this.$refs['upload-image-'+cantidad_campos].putFileSrcOnImage(cantidad_campos);
            const { imgfinal, fileName, typeFile } = await data_Result;
            const other_result = await this.$refs['upload-image-'+cantidad_campos].resizeImage(imgfinal);
            let result = await other_result.replace(`data:image/png;base64,`, "");
            this.$refs['upload-image-'+cantidad_campos].putImageMetadata({result, fileName, typeFile});
          }
        },3000)
      }
    },
    calcular_conteo_plaquetas(){
      let total_suma = 0;
      this.campos_encontrados = 0;
      for(let i = 0; i < this.numero_de_campos; i++){
        if(this.resultados[i] !== undefined){
          total_suma += this.resultados[i];
          this.campos_encontrados++;
        }
      }
      if(this.campos_encontrados > 0){
        let promedio = total_suma / this.campos_encontrados;
        this.conteo_total = promedio * 20000;
      }
      else
        this.conteo_total = null;
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

@font-face {
  font-family: AstroSpace;
  src: url(/fonts/AstroSpace.ttf);
}

body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  background-color: #212c3b;
}

header {
  background-color: #141b25;
}

.main-nav {
  height: 90px;
}

.logo {
  color: white;
  line-height: 90px;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  margin-left: 30px;
  font-family: "AstroSpace", sans-serif;
}

.navlinks {
  list-style: none;
  float: right;
  line-height: 90px;
  margin: 0;
  padding: 0;
}

.navlinks li {
  display: inline-block;
  margin: 0 20px;
}

.navlinks li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  text-transform: uppercase;
  transition: all 0.3s linear 0s;
}

.navlinks li a:hover {
  color: #7ebcb9;
  padding-bottom: 7px;
  border-bottom: 2px solid #7ebcb9;
}

li a.contact {
  background-color: #00adb5;
  padding: 9px 20px;
  border-radius: 50px;
  transition: all 0.3s linear 0s;
}

li a.contact:hover {
  background-color: #047e85;
  color: white;
  border-bottom: none;
}

.menu-btn {
  color: white;
  font-size: 25px;
  float: right;
  line-height: 90px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}

#isChecked {
  display: none;
}

@media (max-width: 800px) {
  .navlinks {
    position: fixed;
    width: 100%;
    height: 100vh;
    text-align: center;
    background: #222831;
    right: -100%;
    transition: all 0.5s;
  }

  .navlinks li {
    display: block;
  }

  .navlinks li a {
    font-size: 20px;
  }

  .navlinks li a:hover {
    border-bottom: none;
  }
  .menu-btn {
    display: block;
  }

  #isChecked:checked ~ .navlinks {
    right: 0;
  }
}

@media (max-width: 350px) {
  .logo {
    margin-left: 15px;
    font-size: 25px;
  }

  .menu-btn {
    margin-right: 15px;
    font-size: 25px;
  }
}



/*funky radios */
.funkyradio div {
  clear: both;
  overflow: hidden;
}

.funkyradio label {
  width: 100%;
  border-radius: 3px;
  border: 1px solid #D1D3D4;
  font-weight: normal;
}

.funkyradio input[type="radio"]:empty,
.funkyradio input[type="checkbox"]:empty {
  display: none;
}

.funkyradio input[type="radio"]:empty ~ label,
.funkyradio input[type="checkbox"]:empty ~ label {
  position: relative;
  line-height: 2.5em;
  text-indent: 3.25em;
  margin-top: 2em;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.funkyradio input[type="radio"]:empty ~ label:before,
.funkyradio input[type="checkbox"]:empty ~ label:before {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  content: '';
  width: 2.5em;
  background: #D1D3D4;
  border-radius: 3px 0 0 3px;
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label {
  color: #888;
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label:before,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label:before {
  content: '\2714';
  text-indent: .9em;
  color: #C2C2C2;
}

.funkyradio input[type="radio"]:checked ~ label,
.funkyradio input[type="checkbox"]:checked ~ label {
  color: #777;
}

.funkyradio input[type="radio"]:checked ~ label:before,
.funkyradio input[type="checkbox"]:checked ~ label:before {
  content: '\2714';
  text-indent: .9em;
  color: #333;
  background-color: #ccc;
}

.funkyradio input[type="radio"]:focus ~ label:before,
.funkyradio input[type="checkbox"]:focus ~ label:before {
  box-shadow: 0 0 0 3px #999;
}

.funkyradio-default input[type="radio"]:checked ~ label:before,
.funkyradio-default input[type="checkbox"]:checked ~ label:before {
  color: #333;
  background-color: #ccc;
}

.funkyradio-primary input[type="radio"]:checked ~ label:before,
.funkyradio-primary input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #337ab7;
}

.funkyradio-success input[type="radio"]:checked ~ label:before,
.funkyradio-success input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5cb85c;
}

.funkyradio-danger input[type="radio"]:checked ~ label:before,
.funkyradio-danger input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #d9534f;
}

.funkyradio-warning input[type="radio"]:checked ~ label:before,
.funkyradio-warning input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #f0ad4e;
}

.funkyradio-info input[type="radio"]:checked ~ label:before,
.funkyradio-info input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5bc0de;
}

</style>