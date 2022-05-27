module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/asrprojects/" : "/",
	devServer: {
		host: 'localhost',
		headers: { "Access-Control-Allow-Origin": "*" }

	  },
}