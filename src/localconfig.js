type = module

module.exports=
{

    enviorment:process.env.NODE_ENV === 'production' ? 'production': 'development',

    serverURL:process.env.SERVER_URL,

    

}





