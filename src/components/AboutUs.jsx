import React from "react";
import { useInView } from 'react-intersection-observer';

function AboutUs() {
    const { ref: firstRowRef, inView: firstRowInView } = useInView({
        triggerOnce: true,
      });

    const { ref: secondRowRef, inView: secondRowInView } = useInView({
        triggerOnce: true,
      });

  return (
    <div className="bg-gray-900 text-white py-12 overflow-x-hidden">
      <div className="container mx-auto text-center">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-8">Who Are We?</h1>
        
        {/* Primera fila */}
        <div ref={firstRowRef} className={`flex flex-col md:flex-row mb-8 items-center transition-all duration-1000 transform ${firstRowInView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src="src/assets/ivan.jpg" alt="Photo" className="w-1/2" />
          </div>
          <div className="md:w-1/2 px-4 py-2">
            <p className="text-lg text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam, vel! Laudantium explicabo enim, fugit reiciendis culpa adipisci sint velit illum aspernatur pariatur eveniet inventore! Sed commodi reiciendis perferendis sit. Odio.
              A earum sequi repellat perspiciatis recusandae? Dolorem et architecto sapiente dicta porro tenetur similique animi quibusdam provident distinctio autem vitae, quidem explicabo quae beatae? Ratione necessitatibus similique consectetur pariatur possimus.
              Culpa mollitia commodi, non modi impedit tenetur beatae quam ratione rem quae, maiores quo suscipit ea eum quis. Consequatur, blanditiis delectus esse sunt quibusdam tempora perspiciatis eos voluptas laboriosam expedita.
              Repudiandae, neque. Quasi necessitatibus dolorem incidunt id dolores unde perspiciatis, molestiae, modi doloremque neque inventore velit culpa, ipsa eius maxime temporibus! Sit harum vero dolor? Quas exercitationem ex ut? Id.
              Nulla cumque tempora fugiat, ut earum accusantium quisquam quidem assumenda voluptas, illo sequi dolorem eveniet rerum! Ullam, temporibus voluptates sequi molestiae nesciunt excepturi corporis libero ratione nisi optio, vitae molestias!
            </p>
          </div>
        </div>
        
        {/* Segunda fila */}
        <div ref={secondRowRef} className={`flex flex-col md:flex-row mb-8 items-center transition-all duration-1000 transform ${secondRowInView ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="md:w-1/2 order-2 md:order-1 px-4 py-2">
            <p className="text-lg text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quibusdam eum culpa numquam tenetur, distinctio neque doloremque aperiam vel, optio quae dolores sapiente aspernatur eaque dignissimos nobis sunt. Minus, doloribus.
              Possimus vitae quas a officia sunt? Accusamus cupiditate asperiores et excepturi, consequatur, voluptatibus ullam, commodi optio vero in consequuntur autem ea ex at placeat quidem aspernatur eos esse ducimus corrupti!
              Magni consequuntur commodi ad! Esse, ab recusandae? Deleniti eligendi illo, officiis laborum cumque magni temporibus at dignissimos quisquam eaque dolor nisi architecto placeat, recusandae fuga iste culpa necessitatibus facilis similique!
              Mollitia quia earum tempora. Illum, labore ipsam corporis minima explicabo odit voluptas incidunt aliquam rem porro repudiandae dolore assumenda quae sit voluptates officiis optio amet? Soluta totam cupiditate quaerat incidunt?
              Quibusdam, placeat illum, sapiente officia non, ex repellendus sed consectetur autem aliquid neque blanditiis possimus excepturi facere inventore perferendis velit molestiae sunt qui! Quisquam, rem? Esse facilis excepturi et culpa!
            </p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 flex items-center justify-center">
            <img src="src/assets/diana.jpg" alt="Photo" className="w-1/2" />
          </div>
        </div>

        {/* Subtítulo y párrafo */}
        <div>
          <h2 className="text-3xl font-bold mb-4">What Is Our Goal?</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget justo eget magna pulvinar suscipit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
