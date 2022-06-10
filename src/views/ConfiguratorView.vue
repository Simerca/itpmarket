<template>
  <v-row class="pa-6">
    <v-col>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field :label="$t('label.title')"></v-text-field>
          </v-col>

          <v-col cols="12">
            <div :class="[`text-h6`]">
              {{ $t("configurator.selectHeaddress") }}
            </div>
            <v-radio-group row v-model="selectedHeaddress">
              <v-radio
                v-for="(item, i) in headdresses"
                :key="i"
                :label="item.name"
                :value="i"
                >{{ item.name }}</v-radio
              >
            </v-radio-group>
          </v-col>

          <v-col cols="12" v-if="headdresses[selectedHeaddress]">
            <v-row>
              <v-col cols="12">
                <h3>{{ $t("configurator.createPayloadItem") }}</h3>
                <v-form @submit.prevent="createItem()">
                  <v-text-field
                    dense
                    v-model="form.title"
                    :label="$t('label.newPayloadItem')"
                  >
                    <template v-slot:append>
                      <v-btn
                        type="submit"
                        depressed
                        class="mb-3"
                        color="primary"
                      >
                        {{ $t("button.new") }}
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <div class="pagebreak"> </div>
            <h3>Payload items</h3>
            <v-simple-table dense hover-disabled>
              <thead>
                <tr>
                  <th>{{ $t("metrics.title") }}</th>
                  <th>{{ $t("metrics.qty") }}</th>
                  <th>{{ $t("metrics.type") }}</th>
                  <th>{{ $t("metrics.x") }}</th>
                  <th>{{ $t("metrics.y") }}</th>
                  <th>{{ $t("metrics.z") }}</th>
                  <th>{{ $t("metrics.pods") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="i">
                  <td>
                    <v-text-field
                      class="mt-3"
                      filled
                      dense
                      v-model="item.title"
                    />
                  </td>
                  <td>
                    <v-text-field
                      class="mt-3"
                      filled
                      dense
                      v-model="item.qty"
                      suffix="units"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-select
                      class="mt-3"
                      :items="payloadType"
                      filled
                      dense
                      v-model="item.type"
                    />
                  </td>
                  <td>
                    <v-text-field
                      class="mt-3"
                      filled
                      dense
                      v-model="item.x"
                      suffix="cm"
                    ></v-text-field>
                  </td>

                  <td>
                    <v-text-field
                      class="mt-3"
                      filled
                      dense
                      v-model="item.y"
                      suffix="cm"
                    ></v-text-field>
                  </td>

                  <td>
                    <v-text-field
                      class="mt-3"
                      filled
                      dense
                      v-model="item.z"
                      suffix="cm"
                    ></v-text-field>
                  </td>

                  <td>
                    <v-text-field
                      class="mt-3"
                      filled
                      dense
                      suffix="kg"
                      v-model="item.pods"
                    ></v-text-field>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>

          <div class="pagebreak"> </div>
          <v-row>
            <v-col cols="12" lg="8">

              <v-row class="text-center text-lg-left">
              <v-col class="text-center text-lg-left" lg="3" cols=6>
                <v-progress-circular
                  v-if="headdresses[selectedHeaddress]"
                  :rotate="360"
                  :size="200"
                  :width="15"
                  :value="total['vol'].percent"
                  :color="getColorIdx(total['vol'].percent)"
                >
                  {{ $t(`metrics.vol`) }}<br />
                  {{ total["vol"].total }} /
                  {{ Math.round(maxVolume) }}
                  {{ total["vol"].unit }}<br />
                  {{ Math.round(total["vol"].percent) }} %
                </v-progress-circular>
              </v-col>
                <v-col class="text-center text-lg-left"  lg="3" cols=6 v-for="(item, i) in total" :key="i">
                  <v-progress-circular
                    v-if="headdresses[selectedHeaddress] && i != 'vol'"
                    :rotate="360"
                    :size="200"
                    :width="15"
                    :value="total[i].percent"
                    :color="getColorIdx(total[i].percent)"
                  >
                    {{ $t(`metrics.${i}`) }}<br />

                    {{ total[i].total }} /
                    {{
                      headdresses[selectedHeaddress][`max${i}`] - payloadMargin
                    }}
                    {{ total[i].unit }} <br />
                    {{ Math.round(total[i].percent) }} %
                  </v-progress-circular>
                </v-col>
              </v-row>
            </v-col>

            <!-- Vue3D -->
            <v-col lg="4" cols="12">
            <h3>Payload representation</h3>
              <vgl-renderer
                :alpha="true"
                style="width: 100%; heigth: 300px"
                id="canvas"
                antialias
              >
                <template #scene>
                  <vgl-scene>
                    <vgl-mesh>
                      <template #geometry>
                        <vgl-box-geometry
                          v-if="total"
                          :width="parseInt(total.x.total)"
                          :height="parseInt(total.y.total)"
                          :depth="parseInt(total.z.total)"
                        />
                      </template>
                      <template #material>
                        <vgl-mesh-standard-material />
                      </template>
                    </vgl-mesh>

                    <vgl-mesh>
                      <template #geometry>
                        <vgl-box-geometry
                          :width="parseInt(headdresses[0].maxx)"
                          :height="parseInt(headdresses[0].maxy)"
                          :depth="parseInt(headdresses[0].maxz)"
                        />
                      </template>
                      <template #material>
                        <vgl-shader-material :wireframe="wireframe" />
                      </template>
                    </vgl-mesh>

                    <vgl-directional-light
                      :position-x="2"
                      :position-y="1.5"
                      :position-z="1"
                    />
                  </vgl-scene>
                </template>
                <template #camera>
                  <!-- <vgl-perspective-camera
                  :position-x="800"
                  :position-y="600"
                  :position-z="200"
                  rotation="lookAt"
                />
               -->
                  <vgl-perspective-camera
                    :position-x="800"
                    :position-y="800"
                    :position-z="1000"
                    :position-radius="5"
                    :position-phi="0.8"
                    :position-theta="0.2"
                    rotation="lookAt"
                  />
                </template>
              </vgl-renderer>
            </v-col>
          </v-row>
          <v-col cols="12">
            {{ $t("configurator.payloadMargin") }}
            <v-text-field
              dense
              v-model="payloadMargin"
              suffix="cm"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-16"> </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import * as components from "vue-gl";

const fragmentShader = `
#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif

const float offset = 1.0 / 128.0;
varying vec2 v_texCoords;
uniform sampler2D u_texture;
void main()
{
	vec4 col = texture2D(u_texture, v_texCoords);
	if (col.a > 0.5)
		gl_FragColor = col;
	else {
		float a = texture2D(u_texture, vec2(v_texCoords.x + offset, v_texCoords.y)).a +
			texture2D(u_texture, vec2(v_texCoords.x, v_texCoords.y - offset)).a +
			texture2D(u_texture, vec2(v_texCoords.x - offset, v_texCoords.y)).a +
			texture2D(u_texture, vec2(v_texCoords.x, v_texCoords.y + offset)).a;
		if (col.a < 1.0 && a > 0.0)
			gl_FragColor = vec4(0.0, 0.0, 0.0, 0.8);
		else
			gl_FragColor = col;
	}
}

`;

const vertexShader = `
attribute vec4 a_position;
attribute vec2 a_texCoord0;
uniform mat4 u_projTrans;
varying vec2 v_texCoords;

void main()
{
	v_texCoords = a_texCoord0;
	gl_Position =  u_projTrans * a_position;
}
`;

export default {
    name:'ConfiguratorView',
  components: {
    ...components,
  },
  computed: {
    defines() {
      return {
        COLOR_CARTESIAN: 0,
        COLOR_SPHERICAL: 1,
        COLOR_DEPTH: 2,
        SCALE: Number.isInteger(this.scale) ? `${this.scale}.0` : this.scale,
      };
    },
    uniforms() {
      return {
        waveOffset: { value: this.waveOffset },
        waveAmp: { value: this.waveAmp },
        waveFreq: { value: this.waveFreq },
        displayColor: { value: this.displayColor },
      };
    },
  },
  data: () => ({
    scale: 1.0,
    waveOffset: 0.0,
    waveAmp: 0.2,
    waveFreq: 10,
    displayColor: 2,
    vertexShader,
    fragmentShader,
    vertShaderShown: false,
    fragShaderShown: false,
    wireframe: true,

    valid: false,
    line: false,
    arrayLine: [],
    items: [],
    payloadType: [
      {
        text: "Organic",
        value: "organic",
      },
      {
        text: "Electronic",
        value: "electronic",
      },
      {
        text: "Chimical",
        value: "chimical",
      },
    ],
    maxVolume: 0,
    selectedHeaddress: 0,
    currentElevator: "x",
    total: {
      pods: {
        total: 0,
        percent: 0,
        unit: "kg",
      },
      x: {
        total: 0,
        percent: 0,
        unit: "cm",
      },
      y: {
        total: 0,
        percent: 0,
        unit: "cm",
      },
      z: {
        total: 0,
        percent: 0,
        unit: "cm",
      },
      vol: {
        total: 0,
        percent: 0,
        unit: "cm3",
      },
    },
    headdresses: [
      {
        name: "Falcon Heavy 2020",
        shape: "rectangle",
        maxpods: 22800,
        maxx: 460,
        maxy: 660,
        maxz: 460,
        maxvol: 111347468.4212,
      },
    ],
    payloadMargin: 0,
    form: {
      title: null,
    },
    settings: null,
  }),
  methods: {
    percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    },
    getVolume(shape) {
      let total = 0;
      let volume = 0;
      for (var i = 0; i < this.items.length; i++) {
        if (shape == "cylinder") {
          volume =
            Math.round(
              Math.PI *
                this.items[i]["x"] *
                this.items[i]["y"] *
                this.items[i]["z"]
            ) * this.items[i]["qty"];
        } else if (shape == "rectangle") {
          volume =
            Math.round(
              this.items[i]["x"] * this.items[i]["y"] * this.items[i]["z"]
            ) * this.items[i]["qty"];
        }
        total += parseInt(volume);
      }
      console.log("total", total);
      this.total["vol"].total = total;
      if (shape == "cylinder") {
        this.maxVolume =
          Math.PI *
          this.headdresses[this.selectedHeaddress]["maxx"] *
          this.headdresses[this.selectedHeaddress]["maxz"] *
          this.headdresses[this.selectedHeaddress]["maxy"];
      } else if (shape == "rectangle") {
        this.maxVolume =
          this.headdresses[this.selectedHeaddress]["maxx"] *
          this.headdresses[this.selectedHeaddress]["maxz"] *
          this.headdresses[this.selectedHeaddress]["maxy"];
      }
      this.total["vol"].percent = this.percentage(total, this.maxVolume);
    },
    getColorIdx(idx) {
      if (idx <= 80) {
        return "green";
      } else if (idx > 80 && idx < 90) {
        return "yellow";
      } else if (idx >= 90 && idx < 100) {
        return "orange";
      } else if (idx >= 100) {
        return "red";
      }
    },
    getTotalOf(index) {
      let total = 0;
      for (var i = 0; i < this.items.length; i++) {
        if (index == this.currentElevator || index == "pods") {
          total += parseFloat(this.items[i][index]) * this.items[i]["qty"];
        } else {
          total += parseInt(this.items[i][index]);
        }
      }
      this.total[index].total = total;
      if (this.headdresses[this.selectedHeaddress]) {
        if (index != "pods") {
          this.total[index].percent = this.percentage(
            total,
            this.headdresses[this.selectedHeaddress][`max${index}`] -
              this.payloadMargin
          );
        } else {
          this.total[index].percent = this.percentage(
            total,
            this.headdresses[this.selectedHeaddress][`max${index}`]
          );
        }
      }
    },
    optimize() {
      console.log("total X", this.total["x"].total);
      console.log("max X", this.headdresses[this.selectedHeaddress].maxx);
      this.currentElevator = "x";
      for (var i = 0; i < this.items.length; i++) {
        while (
          this.total["x"].total >
            this.headdresses[this.selectedHeaddress].maxx -
              this.payloadMargin &&
          this.items[i]["x"]
        ) {
          console.log("override");
          this.total["z"].total += parseInt(this.items[i]["x"]);
          this.total["x"].total -= parseInt(this.items[i]["x"]);
          this.currentElevator = "z";
        }
        while (
          this.total["z"].total >
          this.headdresses[this.selectedHeaddress].maxx - this.payloadMargin
        ) {
          console.log("override");
          this.total["y"].total += parseInt(this.items[i]["z"]);
          this.total["z"].total -= parseInt(this.items[i]["z"]);
          this.currentElevator = "y";
        }
      }
      if (this.headdresses[this.selectedHeaddress]) {
        this.total["x"].percent = this.percentage(
          this.total["x"].total,
          this.headdresses[this.selectedHeaddress][`maxx`] - this.payloadMargin
        );
        this.total["y"].percent = this.percentage(
          this.total["y"].total,
          this.headdresses[this.selectedHeaddress][`maxy`] - this.payloadMargin
        );
        this.total["z"].percent = this.percentage(
          this.total["z"].total,
          this.headdresses[this.selectedHeaddress][`maxz`] - this.payloadMargin
        );
      }
    },
    createItem() {
      this.items.push({
        title: this.form.title,
        type: null,
        qty: 1,
        pods: 0,
        x: 1,
        y: 1,
        z: 1,
      });
      this.form.title = null;
    },
    initCalcul() {
      this.getTotalOf("pods");
      this.getTotalOf("x");
      this.getTotalOf("z");
      this.getTotalOf("y");
      console.log("shape", this.headdresses[this.selectedHeaddress].shape);
      this.getVolume(this.headdresses[this.selectedHeaddress].shape);
    },
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.initCalcul();
        this.optimize();
        console.log(this.items);
        console.log("total", this.total);
      },
    },
    payloadMargin() {
      this.initCalcul();
    },
    selectedHeaddress() {
      this.initCalcul();
    },
  },
};
</script>

<style scoped lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}

@media print {
    .pagebreak { page-break-before: always; } /* page-break-after works, as well */
}
</style>