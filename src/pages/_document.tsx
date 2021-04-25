import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>

                    <link rel="shortcut icon" href="/favicon.png" type="image/png"/>

                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }

}


//o _documente será sempre apresentado em forato de classe, ainda não é possível através do um componente funcional. 

// A página '_document' serve como o index html, ela recarrega uma única vez e envolve todas as páginas, com ela podemos configurar o formato do html que fica por volta da aplicação assim, quando preciar configurar (por exemplo tipos de fontes) ao invés de configurar na página app(que carregará todas as vezes que uma página for mudada) é melhor fazer pelo _docment