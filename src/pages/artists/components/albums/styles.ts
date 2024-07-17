import styled from 'styled-components'

export const AlbumsPageContainer = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
`
export const AlbumsPageHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
`
export const AlbumsPageTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.125rem;
  text-align: left;
  color: ${(props) => props.theme['white-100']};
  display: flex;
  gap: 1rem;

  svg {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
`

export const AlbumsPageMain = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  flex: 1;
  width: 100%;
  gap: 1rem;
`

export const AlbumsPageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;

  img {
    width: 4.5rem;
    height: 4.5rem;
  }
`
export const AlbumsPageItemInfos = styled.aside`
  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme['white-100']};
  }

  p {
    font-size: 0.75rem;
    color: #ffffffcc;
  }
`

export const AlbumsPagePagination = styled.div`
  display: flex;
  color: white !important;
  justify-content: center;
  .MuiPaginationItem-outlinedSecondary {
    background-color: ${(props) => props.theme['green-700']};
  }
  .MuiPaginationItem-colorSecondary {
    background-color: ${(props) => props.theme['green-700']};
  }
  .MuiPaginationItem-textSecondary {
    color: white !important;
  }
  .Mui-selected {
    background-color: ${(props) => props.theme['green-500']} !important;
  }
  .MuiPaginationItem-root:hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme['green-700']} !important;
  }
`
