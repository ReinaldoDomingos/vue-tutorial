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
	<p>Frete: {{envio}}</p>
	<ul>
	<li v-for='detalhe in detalhes'>{{detalhe}}</li>
	</ul>

	<div v-for='(variacao,index) in variacoes' :key='variacao.id'
	class="color-box" :style="{backgroundColor:variacao.color}"
	@mouseover="atualizarProduto(index)">
	</div>
	<button v-on:click='addCartao' :disabled='!emEstoque' :class='{disabledButton: !emEstoque}'>Add Cartão de Crédito</button>
	</div>

	<div>
	<h2>Avaliações</h2>
	<p v-if="!reviews.length">Esse produto não possui avaliacoes.</p>
	<ul>
	<li v-for="review in reviews">
	<p>{{review.nome}}</p>
	<p>Avaliação: {{review.avaliacao}}</p>
	<p>{{review.review}}</p>
	</li>
	</ul>
	</div>

	<produto-review @review-submitted="addReview"></produto-review>
	`,
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
			],
			reviews: []
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
		},
		envio(){
			if(this.premium)
				return "Grátis"
			return 2.99
		}
	},
	methods:{
		addCartao: function () {
			this.$emit('add-cartao',this.variacoes[this.variacaoSelecionada].id)
		},
		atualizarProduto: function(index){
			this.variacaoSelecionada = index
		},
		addReview: function(produtoReview){
			this.reviews.push(produtoReview)
		}
	}
})

Vue.component('produto-review',{
	template: `
	<form class="review-form" @submit.prevent="onSubmit">

	<p v-if="erros.length">
	<b>Por favor corriga os seguintes erro(s):</b>
	<ul>
	<li v-for="erro in erros">{{erro}}</li>
	</ul>
	<p>

	<p>
	<label for="name">Nome:</label>
	<input id="name" v-model="nome" placeholder="nome">
	</p>

	<p>
	<label for="review">Comente sobre o produto:</label>      
	<textarea id="review" v-model="review"></textarea>
	</p>

	<p>
	<label for="rating">Avaliação:</label>
	<select id="rating" v-model.number="avaliacao">
	<option>5</option>
	<option>4</option>
	<option>3</option>
	<option>2</option>
	<option>1</option>
	</select>
	</p>

	<p>
	<input type="submit" value="Enviar">  
	</p>    

	</form>
	`,
	data(){
		return {
			nome:  null,
			review: null,
			avaliacao: null,
			erros: []
		} 
	},
	methods:{
		onSubmit(){
			if(this.nome && this.avaliacao && this.review){
				let produtoReview = {
					nome: this.nome,
					review: this.review,
					avaliacao: this.avaliacao
				}
				this.$emit('review-submitted',produtoReview)
				this.nome =  null
				this.review = null
				this.avaliacao = null
			}else{
				if(!this.nome)	this.erros.push("Nome obrigatório.")
					if(!this.review)	this.erros.push("Comentaŕio obrigatório.")
						if(!this.avaliacao)	this.erros.push("Avaliação obrigatória.")
					}
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