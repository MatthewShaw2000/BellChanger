//Packages
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//Mui packages
import { Container } from "@mui/material";

//CSS
import '../css/components.css';

export default function SlideShowSection()
{
    return(
        <section className='slider_container'>
            <Container maxWidth='md'>
                <div className='slider_inner_container'>
                    <Carousel infiniteLoop autoPlay={true} showThumbs={false} showStatus={false} renderIndicator={false}>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Alnwick.JPG' alt='' />
                            <p className="legend">St Michael | Alnwick | 10 bells | 10-0-9</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Doncaster.JPG' alt='' />
                            <p className="legend">Minster Church of St George | Doncaster | 8 bells | 29-2-17</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Durham.JPG' alt='' />
                            <p className="legend">Cathedral Church of Christ, Blessed Virgin Mary and St Cuthbert (Durham Cathedral) | Durham | 10 bells | 28-0-6</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/EastRetford.JPG' alt='' />
                            <p className="legend">St Swithuns | East Retford | 10 bells | 23-0-7</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Jesmond.JPG' alt='' />
                            <p className="legend">St George | Jesmond | 8 bells | 18-0-20</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Misson.JPG' alt='' />
                            <p className="legend">St John the Baptist | Misson | 6 bells | 12-0-22</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Newcastle.JPG' alt='' />
                            <p className="legend">Cathedral Church of St Nicholas (Newcastle Cathedral) | Newcastle Upon Tyne | 12 bells | 37-2-17</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Southwell.JPG' alt='' />
                            <p className="legend">Cathedral and Parish Church of the Blessed Virgin Mary (Southwell Minster) | Southwell | 12 bells (Anticlockwise ring) | 25-1-3</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/SuttonCumLound.JPG' alt='' />
                            <p className="legend">St Bartholomew | Sutton cum Lound | 8 bells | 9-2-14</p>
                        </div>
                        <div>
                            <img src='http://unn-w20013772.newnumyspace.co.uk/Year3/KV6003/Frontend/images/Tickhill.JPG' alt='' />
                            <p className="legend">St Mary | Tickhill | 8 bells | 13-3-7</p>
                        </div>
                    </Carousel>
                </div>
                <hr/>
            </Container>
        </section>
    );
}