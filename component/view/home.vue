<template>
	<div>
		<h2>Home</h2>

		<p>Welcome to Pass The Quill</p>

		<h4>But What Is Pass The Quill?</h4>
		<p>
			It's a simple word game where you and a friend choose a five letter word
			for the other to guess.  You take turns guessing the others' word, and if
			your guess has one or more matching letters then your friend chooses one
			of them to reveal.  You win by guessing your friend's word correctly which
			usually happens after revealing all 5 letters.
		</p>

		<h4>How Do I Start Playing?</h4>
		<p>
			Click 'Begin' above to create a game room.  After entering in you and your
			friends' emails, I'll send both of you a link and you'll go from there.
		</p>
		<p>
			If you have questions or get confused confused along the way please email
			me at {{ global.authorEmail }}.  I want this game to be fun and simple so
			feedback is appreciated.
		</p>
	</div>
</template>

<script>
export default {
  name: 'home',
  path: '/',
}
</script>

<style lang="scss">
.home.view {
  > p + p {
    @include res-aware-element-spacing('margin-top', 'lg');
  }
}
</style>
