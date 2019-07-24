Vue.component('produto',{
	props:{
		premium:{
			type: Boolean,
			required: true
		}
	},
	template: `
	<div class="produto">
	<div class="produto-imagem">			
	<img v-bind:src="imagem" >
	</div>		
	<div class="produto-info">			
	<h1>{{titulo}}</h1>
	<p v-if='emEstoque'>Em estoque</p>				
	<p v-else>Estoque esgotado</p>				
	<p>Usuário Premium: {{premium}}</p>
	<ul>
	<li v-for='detalhe in detalhes'>{{detalhe}}</li>
	</ul>

	<div v-for='(variacao,index) in variacoes' :key='variacao.id'
	class="color-box" :style="{backgroundColor:variacao.color}"
	@mouseover="atualizarProduto(index)">
	</div>
	<button v-on:click='addCartao' :disabled='!emEstoque' :class='{disabledButton: !emEstoque}'>Add Cartão de Crédito</button>
	</div>`,
	data(){
		return  {
			marca: 'Vue',
			produto: 'Meias',
			variacaoSelecionada:0,
			detalhes: ['80% cotton','20% polyester','Unisex'],
			variacoes: [
			{
				id: 2234,
				color: 'green',
				imagem: '../assets/vmSocks-green.png',
				quantidade:10
			},
			{
				id: 2235,
				color: 'blue',
				imagem: '../assets/vmSocks-blue.png',	
				quantidade:0
			}
			]
		}
	},
	computed:{
		titulo(){
			return this.produto + ' ' + this.marca
		},
		imagem(){
			return this.variacoes[this.variacaoSelecionada].imagem
		},
		emEstoque(){
			return this.variacoes[this.variacaoSelecionada].quantidade
		}
	},
	methods:{
		addCartao: function () {
			this.$emit('add-cartao',this.variacoes[this.variacaoSelecionada].id)
		},
		atualizarProduto: function(index){
			this.variacaoSelecionada = index
		}
	}
})


var app = new Vue({
	el: '#app',
	data:{
		premium: true,
		cartao: []
	},
	methods:{
		atualizarCartoes(id){
			this.cartao.push(id)
		}
	}
})