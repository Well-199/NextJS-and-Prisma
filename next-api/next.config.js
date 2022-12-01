/** @type {import('next').NextConfig} */
const nextConfig = {
  	reactStrictMode: true,
  	swcMinify: true,
	/*
		Exemplo de liberação de todas as rotas (:path*) 
		Menos a /ping liberada somente para localhost e metodo GET
	*/
  	headers: async () => {
    	return [
			{
				source: '/api/:path*',
				headers: [
					{ 
						key: 'Access-Control-Allow-Origin', 
						value: '*' 
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, PUT, DELETE'
					}
				]
			},
			{
				source: '/api/ping',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'http:localhost:3000'
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET'
					}
				]
			}
    	]
  	}
}

module.exports = nextConfig
