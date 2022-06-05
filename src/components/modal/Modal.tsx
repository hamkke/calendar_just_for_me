import { cx } from 'styles'
import styles from './modal.module.scss'

type Props = {
  setModalOpen: any
}

const Test: React.FC<Props> = ({ setModalOpen }: Props) => {
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalBox}>
        <h2 className={styles.todayDateTitle}>2022년 6월 6일</h2>
        <div className={styles.monthBtnWrap}>
          <button type='button' className={cx(styles.monthBtn)}>
            시작
          </button>
          <button type='button' className={cx(styles.monthBtn)}>
            종료
          </button>
        </div>
        <textarea className={styles.modalMemo} placeholder='메모 메모' />
        <button type='button' onClick={() => setModalOpen(false)} className={styles.closeBtn}>
          X
        </button>
        <button type='button' className={styles.saveBtn}>
          저장
        </button>
      </div>
    </div>
  )
}

export default Test
