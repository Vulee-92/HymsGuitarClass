import React from 'react'

function AboutPage() {
  return (

    <section className="services" id="service">
      <div className="container">
        <div className="content_service text-center">
          <div className='row' style={{ marginBottom: '100px' }}>
            <div className='col-md-6'>
              <img src="picture/img/gioithieu.jpeg" className="img-fluid" />
            </div>
            <div className='col-md-6' >
              <h3 >Giới thiệu về Football Club DTHCV</h3>
              <p>DTHCV là 1 clb chuyên cung cấp và cho thuê sân bóng đá mini nhân tạo hàng đầu Việt Nam.Với mong muốn đem đến cho thị trường những sản phẩm, những dịch vụ đạt tiêu chuẩn châu Âu và những trải nghiệm hoàn toàn mới về sân bóng đá mini nhân tạo cho khách hàng.
              </p>
              <br />
              <p>Không những thế, Football Club DTHCV còn luôn cập nhật các tin tức mới nhất,nhanh nhất và chính xác nhất về bóng đá,các cầu thủ ngôi sao trên toàn thế giới.</p>
              <br />
              <p>Chúng tôi luôn luôn đặt tiêu chí chất lượng lên hàng đầu để đảm bảo trong quá trình khách hàng thuê sân bóng. Trong tương lai, chúng tôi sẽ phát triển thêm các dịch vụ hỗ trợ thể dục,thể thao để tối ưu hóa lợi ích cho khách hàng.</p>
            </div>
          </div>
          <h3>Dịch vụ của chúng tôi</h3>
          <p>Cung cấp các thông tin về dịch vụ đặt sân bóng đá.</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="box_boder text-center" style={{ marginBottom: '25px' }}>
              <div className="title_items text-uppercase">
                <h4>KẾT NỐI</h4>
              </div>
              <div className="text_items" >
                <p>Kết nối khách hàng dễ dàng và hiệu quả.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box_boder text-center">
              <div className=" text-uppercase title_items">
                <h4>Tận tình</h4>
              </div>
              <div className="text_items" style={{ color: '#7e7e7e' }}>
                <p> Khách hàng là niềm tin của chúng tôi.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box_boder text-center">
              <div className="title_items text-uppercase">
                <h4>Chuyên nghiệp</h4>
              </div>
              <div className="text_items">
                <p> Tổ chức thi đấu chuẩn như FIFA.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box_boder text-center">
              <div className="title_items text-uppercase">
                <h4>Ưu đãi</h4>
              </div>
              <div className="text_items">
                <p> Nhiều ưu đãi hấp dẫn bất ngờ.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box_boder text-center">
              <div className="title_items text-uppercase">
                <h4>nhanh chóng</h4>
              </div>
              <div className="text_items">
                <p> Tìm sân, đặt sân chỉ bằng vài cú nhấp chuột.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box_boder text-center">
              <div className="title_items text-uppercase">
                <h4>tiện lợi</h4>
              </div>
              <div className="text_items">
                <p> Đầy đủ tiện nghi, dịch vụ chu đáo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>






  )
}

export default AboutPage
