from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import CmsPage, Admin
from app.schemas.schemas import CmsPageUpdate, CmsPageOut
from app.auth.security import get_current_admin

router = APIRouter(prefix="/api/cms", tags=["CMS Pages"])


@router.get("", response_model=list[CmsPageOut])
def list_pages(db: Session = Depends(get_db)):
    return db.query(CmsPage).all()


@router.get("/{slug}", response_model=CmsPageOut)
def get_page(slug: str, db: Session = Depends(get_db)):
    page = db.query(CmsPage).filter(CmsPage.slug == slug).first()
    if not page:
        raise HTTPException(404, "Page not found")
    return page


@router.put("/{slug}", response_model=CmsPageOut)
def update_page(slug: str, payload: CmsPageUpdate, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    page = db.query(CmsPage).filter(CmsPage.slug == slug).first()
    if not page:
        page = CmsPage(slug=slug, title=payload.title or slug, content=payload.content or "")
        db.add(page)
    else:
        if payload.title is not None:
            page.title = payload.title
        if payload.content is not None:
            page.content = payload.content
    db.commit()
    db.refresh(page)
    return page
