<script>
	import { fade, fly } from 'svelte/transition';
	import Info from './components/Info.svelte'
	import { fetchMovies, fetchMovie } from './api/movie'

	let movies = []
	let movie
	const movieId = Math.floor(Math.random() * 1000)
	let term = ''
	const limit = 5

	const search = async (term) => {
		const res = await fetchMovies(term)
		movies = res.data.results.slice(0, limit)
	}

	const searchMovie = async (movieId) => {
		const res = await fetchMovie(movieId)
		movie = res.data
	}

	const selectMovie = (movieId) => {
		movies = []
		searchMovie(movieId)
		term = ''
	}

	searchMovie(movieId)

	$: if(term.length > 2){
		search(term)
	} else {
		movies = []
	}
</script>
{#if movie}
	<main class="min-h-screen antialiased bg-center bg-cover" style="background-image: url(https://image.tmdb.org/t/p/original/{movie.backdrop_path})">
		<div class="min-h-screen pb-10 outer-container">
			<nav class="py-10">
				<div class="max-w-5xl px-3 mx-auto">
					<div class="flex justify-between items-center">
						<img class="w-32" src="https://skempin.github.io/reactjs-tmdb-app/images/tmdb.svg" alt="">

						<div class="w-2/5 relative">
							<input 
								class="w-full p-2 focus:outline-none bg-transparent text-white border-b-2" 
								type="text" 
								placeholder="Search Movie Title..."
								bind:value={term}>
							{#if movies.length > 0}
								<div 
									in:fly="{{ y: 50, duration: 750 }}" 
									out:fade
									class="absolute w-full bg-white">
									{#each movies as movie}
										<div 
											class="py-2 px-3 cursor-pointer hover:bg-gray-200"
											on:click={selectMovie(movie.id)}>{movie.original_title}</div>	
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</nav>

				<div>
					<div class="max-w-5xl px-3 mx-auto">
						<div class="flex text-white bg-black">
							<!-- Image -->
							<div class="w-2/5">
								<img src="https://image.tmdb.org/t/p/w500/{movie.poster_path}" alt="{movie.original_title}">
							</div>
							
							<!-- Content -->
							<div class="w-3/5 py-8 pl-5">
								<h1 class="text-5xl font-bold uppercase">{movie.original_title}</h1>
								<h2 class="text-xl text-green-400">{movie.tagline}</h2>
								<p>{movie.overview}</p>

								<div class="mt-8">
									<h3 class="text-2xl text-green-400">Adventure, Drama, Science Fiction</h3>
									<div>Legendary Pictures, Syncopy, Lynda Obst Productions</div>
								</div>

								<div class="grid grid-cols-2 mt-4">
									<Info label="Original release">
										{movie.release_date}
									</Info>
									<Info label="Running Time">
										{movie.runtime} mins
									</Info>
									<Info label="Box Office">
										${movie.revenue}
									</Info>
									<Info label="Vote Average">
										{movie.vote_average}
									</Info>
								</div>
							</div>
						</div>
					</div>
				</div>
		</div>
	</main>
{/if}

<footer class="py-5 text-sm font-light text-center text-white bg-gray-900">
	<a class="hover:text-green-500" href="https://hallef.com" target="_blank">
		Developed by Hallef Santos
	</a>
	<br>
	<a class="hover:text-green-500" href="#">
		<div class="inline-block w-3 h-3">
			<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
		</div>
		View Code
	</a>
</footer>

<style>
	.outer-container{
		background-image: linear-gradient(rgba(0,0,0,.9) 15%,rgba(0,0,0,.2) 40%,#000 90%);
    	background-attachment: fixed;
	}
</style>