export default function CopyRight() {
    return (
      <>
        <div className="container bottom-0 w-full text-center ">
          <p className=" p-3">
            © Copyright {new Date().getFullYear()}.{" "}
            <span className="text-primary cursor-pointer" onClick={()=>window.location.href="/"} >Trading Materials</span>. Designed by Global Software
            Technologies All rights reserved.
          </p>
        </div>
      </>
    );
}