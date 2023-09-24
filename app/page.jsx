import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text blue_gradient text-center">
        Share and find AI Prompts
        <br className="max-md:hidden" />
      </h1>
      <p className="desc  text-center">
        Promptly is a tool to share or find cool and creative AI prompts.
      </p>

      <Feed />
        
    </section>
  );
};

export default Home;
