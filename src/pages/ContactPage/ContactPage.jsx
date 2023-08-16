import React from 'react'

function ContactPage() {
  return (
    <div>
      <div id="heading-breadcrumbs" className="brder-top-0 border-bottom-0">
        <div className="container">
          <div className="row d-flex align-items-center flex-wrap">
            <div className='text-center'>
              <h2>Liên hệ với chúng tôi</h2>
            </div>

          </div>
        </div>
      </div>
      <div id="content">
        <div id="contact" className="container">
          <section className="bar">
            <div className="row">
              <div className="col-md-12">
                <div className="heading">
                  <h2 style={{ color: 'green' }}>Chúng tôi ở đây để giúp bạn</h2>
                </div>
                <p className="lead">Nếu có điều gì thắc mắc hoặc mong muốn hợp tác kinh doanh, hãy liên lạc với chúng tôi.</p>
              </div>
            </div>
          </section>
          <section>
            <div className="row text-center">
              <div className="col-md-4">
                <div className="box-simple">
                  <div className="icon-outlined" ><i className="fa fa-map-marker" /></div>
                  <h3 className="h4">Địa chỉ</h3>
                  <p> 32 Hai Bà Trưng,<br />Phường 12, Quận 10, TPHCM<br /></p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-simple">
                  <div className="icon-outlined"><i className="fa fa-phone" /></div>
                  <h3 className="h4">Gọi ngay</h3>
                  <p><strong>+84 386 632 736</strong></p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-simple">
                  <div className="icon-outlined"><i className="fa fa-envelope" /></div>
                  <h3 className="h4">Email</h3>
                  <ul className="list-unstyled text-sm">
                    <li><strong><a href="mailto:">contact@footballdthcv.com</a></strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="container mb-3 border border-1 shadow rounded rounded-3" style={{ width: 'auto' }}>
              <div className="row">
                <div className="col-md-6 col-12">
                  <form action="" method="POST"  >
                    <div className="container mb-3 border border-1 shadow rounded rounded-3" style={{ padding: 30 }}>
                      <div className="form-group">
                        <div className="col-md-12">
                          <label className="col-form-label"><b>Tiêu đề</b></label>
                          <input type="text" className="form-control" name="Title" placeholder="Xin chào!" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <label className="col-form-label"><b>Email</b></label>
                          <input type="text" className="form-control" name="Email" placeholder="footballdthcv@gmail.com" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <label className="col-form-label"><b>Nội dung</b></label>
                          <textarea type="text" className="form-control" name="Content" rows={6} placeholder="Viết nội dung" required defaultValue={""} />
                        </div>
                      </div>
                      <button type="submit" className="form-control bg-success btn btn-primary"><i className="fa fa-envelope-o" /> Gửi liên hệ</button>
                    </div>
                  </form>
                </div>
                <div className="col-md-6 col-12">
                  <div id="map" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  )
}

export default ContactPage