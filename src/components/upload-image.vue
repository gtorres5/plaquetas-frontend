<template>
  <div>
    <div class="px-6 py-1" style="border: solid;
    font-size: 25px;
    font-weight: bold;
    background-color: rgb(23 159 230);border-radius: 11px;color: #ffff;
    ">
      plastado {{id}} | {{ count_items !== null ? 'Total: ' + count_items : ''}}  
      <button 
        style="float: right" 
        v-if="visibilidad_contenido_plastado" 
        @click="visibilidad_contenido_plastado = false"
      >
        <i class="fas fa-angle-up"></i>
      </button>
      <button style="float: right" v-else @click="visibilidad_contenido_plastado = true">
        <i class="fas fa-angle-down"></i>
      </button>
      <button 
        style="float: right;
                background-color: #b9810efc;
                color: #f3f4f6;
                border-radius: 6px;" 
        class="mr-3 px-2" 
        @click="limpiar"
      >
        limpiar
      </button>
    </div>
    <input 
      class="hidden" 
      type="file" 
      :id="'file'+id" 
      @change="onFileSelected" 
      :multiple="configuraciones.seleccion_multiple"
    />
    <div 
      class="images"
      v-viewer
      :class="visibilidad_contenido_plastado ? 'contenido_visible py-5' : 'contenido_invisible'"
      style="border-radius: 10px;box-shadow: 3px 2px 4px 3px rgba(0,0,0,0.2);border-top: #4c5259;margin-bottom: 10px"
    >
      
      <button
        class="p-2 bg-red-500 text-white focus:outline-none mx-2"
        @click="subirImagen()"
      >
        Subir imagen
      </button>
      <img
        v-show="visibilidad_contenido_plastado"
        src=""
        class="rounded-lg mt-5"
        style="width: 20%; display: inline"
        alt=""
        :id="'image'+id"
      />
      <button
        v-if="procesando"
        class="p-2 bg-blue-300 rounded-md text-white mx-2"
      >
        <i class="fas fa-spinner fa-spin"></i>
      </button>
      <button
        v-else
        @click="procesarImagen()"
        class="p-2 bg-blue-500 rounded-md text-white focus:outline-none mx-2"
      >
        Procesar
      </button>
      <img
        v-show="visibilidad_contenido_plastado"
        src=""
        class="rounded-lg mt-5 ml-2"
        style="width: 20%; display: inline"
        alt=""
        :id="'image_final'+id"
     />
    </div>
    <div class="fondo_transparente" v-show="visibilidad_modal">
        <div class="modal">
            <div class="modal_cerrar" @click="cerrar_modal">
                <span>x</span>
            </div>
            <div class="modal_mensaje">
                <img
                  src=""
                  class="rounded-lg mt-5 ml-2"
                  style="width: 100%; display: inline"
                  alt=""
                  :id="'image_modal'+id"
                />
            </div>
        </div>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  setup() {
    return {
      image_str: "",
      tag: "Hemograma",
      type_file: "",
    };
  },
  props:{
    id: Number,
    configuraciones: Object,
  },
  data() {
    return {
      visibilidad_modal: false,
      count_items: null,
      visibilidad_contenido_plastado: true,
      procesando: false,
    };
  },

  methods: {

    abrir_modal(id){
      this.visibilidad_modal = true;
      document.getElementById("image_modal"+this.id).src = document.getElementById(id).src;
    },

    cerrar_modal(){
      this.visibilidad_modal = false;
    },

    limpiar(){
      this.count_items = null;
      document.getElementById("file"+this.id).value = '';
      document.getElementById("image"+this.id).src = '';
      document.getElementById("image_final"+this.id).src = '';
      this.$emit('emitido', {posicion: this.id, resultado: undefined});
    },

    async procesarImagen() {
      this.procesando = true;
      let tag = this.tag.replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i');
      tag = tag.replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll(' ', '_');
      tag = tag.replaceAll('(', '').replaceAll(')', '');
      while(tag.split('.').length > 2){
        tag = tag.replace('.', '_')
      } ;
      try{
        const url = import.meta.env.MODE === 'development'  ? import.meta.env.VITE_APP_URL_LOCAL : import.meta.env.VITE_APP_URL_PRODUCCION;
        const { data } = await axios.post(`${url}/rn/reconize_objects`,{
          tag: tag,
          image_data: this.image_str,
        });
        this.count_items = data.count_items;
        document.getElementById(
          "image_final"+this.id
        ).src = `data:${this.type_file};base64,${data.image_data}`;
        this.procesando = false;
        this.$emit('emitido', {posicion: this.id, resultado: this.count_items});
      }
      catch{
        alert('lo siento, sucedió un error');
        this.procesando = false;
      }
    },

    subirImagen() {
      document.getElementById("file"+this.id).click();
    },

    resizeImage(base64) {
      return new Promise((resolve, reject) => {
        var width = 540;
        var height = 588;

        var img = new Image();
        img.src = base64;
        //
        var oc = document.createElement("canvas"),
          octx = oc.getContext("2d");
        oc.width = width;
        oc.height = height;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        const final = oc.toDataURL();
        resolve(final);
      });
    },

    onFileSelected() {
      let indices_dom_usados = [];
      indices_dom_usados.push(this.id);
      this.putFileSrcOnImage(this.id).then((resp) => {
        const { imgfinal, fileName, typeFile } = resp;
        this.resizeImage(imgfinal).then((resp2) => {
          let result = resp2.replace(`data:image/png;base64,`, "");
          this.putImageMetadata({result, fileName, typeFile})
        });
      });
      let contador_reinicios = 0;
      let files_temporal = document.getElementById("file"+this.id).files;
      for(let i = 1; i < files_temporal.length; i++){
        let dataTransfer = new DataTransfer();
        let reinicio = false;
        dataTransfer.items.add(files_temporal[i]);
        let index_file = this.id + i - 1;
        do{
          index_file++;
          if(document.getElementById("file"+(index_file)) === null){
            if(this.configuraciones.reiniciar_conteo && !reinicio){
              reinicio = true;
              contador_reinicios++;
              index_file = contador_reinicios;
            }
            else{
              //preguntar si se aumentaran campos y emitir la cantidad de files sobrantes
              if(this.configuraciones.habilitar_cambio_cantidad_campos && this.configuraciones.habilitar_cambio_campos_subida_multiple){
                dataTransfer = new DataTransfer();
                for(let e = i; e < files_temporal.length; e++){
                  dataTransfer.items.add(files_temporal[e]);
                }
                this.$emit('incrementar_campos_con_file', dataTransfer);
              }
              //  else
              return;
            }
          }
        }while(
          document.getElementById("file"+(index_file)).files.length !== 0
          && this.configuraciones.saltar
        )
        document.getElementById("file"+(index_file)).files = dataTransfer.files;
        if(indices_dom_usados.includes(index_file)){
          dataTransfer = new DataTransfer();
          for(let e = i; e < files_temporal.length; e++){
            dataTransfer.items.add(files_temporal[e]);
          }
          this.$emit('incrementar_campos_con_file', dataTransfer);
          return; 
        }
        indices_dom_usados.push(index_file);
        this.putFileSrcOnImage(index_file).then((resp) => {
          const { imgfinal, fileName, typeFile } = resp;
          this.resizeImage(imgfinal).then((resp2) => {
            let result = resp2.replace(`data:image/png;base64,`, "");
            //this.putImageMetadata({result, fileName, typeFile})
            this.$emit(
              'brother_image_metadata', 
              {index: index_file, data: {result, fileName, typeFile}}
            );
          });
        });
      }
    },
    putFileSrcOnImage(index){
      return new Promise((resolve, rejec) => {
        try {
          var imgfinal = null;
          var file = document.getElementById("file"+index).files[0];
          var reader = new FileReader();
          if (file) {
            let fileName = file.name;
            let typeFile = file.type;
            let img = new Image();
            img.onload = function () {
              reader.readAsDataURL(file);
              reader.onloadend = function () {
                imgfinal = reader.result;
                document.getElementById("image"+index).src = reader.result;
                resolve({ imgfinal, fileName, typeFile });
              };
            };
            img.src = URL.createObjectURL(file);
          }
        } catch (error) {
          rejec(error);
        }
      })
    },
    putImageMetadata(metadata){
      this.image_str = metadata.result;
      this.tag = metadata.fileName;
      this.type_file = metadata.typeFile;
      if(this.configuraciones.busqueda_automatica === true)
        this.procesarImagen();
    }
  },
};
</script>
<style scoped>
    .fondo_transparente{
      top: 0;
      left: 0;
      background: rgba(126, 124, 124, 0.397);
      position: fixed;
      height: 100vh;
      width: 100%;
    }
    .modal{
      width: 500px;
      height: 500px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
    .modal_cerrar{
      background: white;
      position: absolute;
      right: -20px;
      color: crimson;
      top: -20px;
      width: 40px;
      height: 40px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .modal_mensaje{            
      padding: 10px 30px;
    }
    .contenido_invisible{
      max-height: 0;
    }
    .contenido_invisible button{
      display: none;
    }
    .contenido_invisible img{
      display: none;
    }
</style>